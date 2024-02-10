package tn.inetum.documentMS.service;



import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.pdfbox.cos.COSBase;
import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.io.MemoryUsageSetting;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.interactive.action.PDAction;
import org.apache.pdfbox.pdmodel.interactive.action.PDActionGoTo;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotation;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationLink;
import org.apache.pdfbox.pdmodel.interactive.documentnavigation.destination.PDDestination;
import org.apache.pdfbox.pdmodel.interactive.documentnavigation.destination.PDPageDestination;
import org.springframework.stereotype.Service;

/**
 * Split a document into several other documents.
 *
 * @author Mario Ivankovits
 * @author Ben Litchfield
 */
@Service
public class splite
{
    private static final Log LOG = LogFactory.getLog(splite.class);

    private PDDocument sourceDocument;
    private PDDocument currentDestinationDocument;

    private int splitLength = 1;
    private int startPage = Integer.MIN_VALUE;
    private int endPage = Integer.MAX_VALUE;
    private List<PDDocument> destinationDocuments;

    private int currentPageNumber;

    private MemoryUsageSetting memoryUsageSetting = null;

    /**
     * @return the current memory setting.
     */
    public MemoryUsageSetting getMemoryUsageSetting()
    {
        return memoryUsageSetting;
    }

    /**
     * Set the memory setting.
     *
     * @param memoryUsageSetting The memory setting.
     */
    public void setMemoryUsageSetting(MemoryUsageSetting memoryUsageSetting)
    {
        this.memoryUsageSetting = memoryUsageSetting;
    }

    /**
     * This will take a document and split into several other documents.
     *
     * @param document The document to split.
     *
     * @return A list of all the split documents. These should all be saved before closing any
     * documents, including the source document. Any further operations should be made after
     * reloading them, to avoid problems due to resource sharing. For the same reason, they should
     * not be saved with encryption.
     *
     * @throws IOException If there is an IOError
     */
    public List<PDDocument> split(PDDocument document) throws IOException
    {
        // reset the currentPageNumber for a case if the split method will be used several times
        currentPageNumber = 0;
        destinationDocuments = new ArrayList<>();
        sourceDocument = document;
        processPages();
        return destinationDocuments;
    }


    public void setSplitAtPage(int split)
    {
        if(split <= 0)
        {
            throw new IllegalArgumentException("Number of pages is smaller than one");
        }
        splitLength = split;
    }

    public void setStartPage(int start)
    {
        if(start <= 0)
        {
            throw new IllegalArgumentException("Start page is smaller than one");
        }
        startPage = start;
    }


    public void setEndPage(int end)
    {
        if(end <= 0)
        {
            throw new IllegalArgumentException("End page is smaller than one");
        }
        endPage = end;
    }

    private void processPages() throws IOException
    {
        for (PDPage page : sourceDocument.getPages())
        {
            if (currentPageNumber + 1 >= startPage && currentPageNumber + 1 <= endPage)
            {
                processPage(page);
                currentPageNumber++;
            }
            else
            {
                if (currentPageNumber > endPage)
                {
                    break;
                }
                else
                {
                    currentPageNumber++;
                }
            }
        }
    }


    private void createNewDocumentIfNecessary() throws IOException
    {
        if (splitAtPage(currentPageNumber) || currentDestinationDocument == null)
        {
            currentDestinationDocument = createNewDocument();
            destinationDocuments.add(currentDestinationDocument);
        }
    }


    protected boolean splitAtPage(int pageNumber)
    {
        return (pageNumber + 1 - Math.max(1, startPage)) % splitLength == 0;
    }

    protected PDDocument createNewDocument() throws IOException
    {
        PDDocument document = memoryUsageSetting == null ?
                new PDDocument() : new PDDocument(memoryUsageSetting);
        document.getDocument().setVersion(getSourceDocument().getVersion());
        PDDocumentInformation sourceDocumentInformation = getSourceDocument().getDocumentInformation();
        if (sourceDocumentInformation != null)
        {
            // PDFBOX-5317: Image Capture Plus files where /Root and /Info share the same dictionary
            // Only copy simple elements to avoid huge files
            COSDictionary sourceDocumentInformationDictionary = sourceDocumentInformation.getCOSObject();
            COSDictionary destDocumentInformationDictionary = new COSDictionary();
            for (COSName key : sourceDocumentInformationDictionary.keySet())
            {
                COSBase value = sourceDocumentInformationDictionary.getDictionaryObject(key);
                if (value instanceof COSDictionary)
                {
                    LOG.warn("Nested entry for key '" + key.getName()
                            + "' skipped in document information dictionary");
                    if (sourceDocument.getDocumentCatalog().getCOSObject() ==
                            sourceDocument.getDocumentInformation().getCOSObject())
                    {
                        LOG.warn("/Root and /Info share the same dictionary");
                    }
                    continue;
                }
                if (COSName.TYPE.equals(key))
                {
                    continue; // there is no /Type in the document information dictionary
                }
                destDocumentInformationDictionary.setItem(key, value);
            }
            document.setDocumentInformation(new PDDocumentInformation(destDocumentInformationDictionary));
        }
        document.getDocumentCatalog().setViewerPreferences(
                getSourceDocument().getDocumentCatalog().getViewerPreferences());
        return document;
    }

    protected void processPage(PDPage page) throws IOException
    {
        createNewDocumentIfNecessary();

        PDPage imported = getDestinationDocument().importPage(page);
        if (page.getResources() != null && !page.getCOSObject().containsKey(COSName.RESOURCES))
        {
            imported.setResources(page.getResources());
            LOG.info("Resources imported in Splitter"); // follow-up to warning in importPage
        }
        // remove page links to avoid copying not needed resources
        processAnnotations(imported);
    }

    private void processAnnotations(PDPage imported) throws IOException
    {
        List<PDAnnotation> annotations = imported.getAnnotations();
        for (PDAnnotation annotation : annotations)
        {
            if (annotation instanceof PDAnnotationLink)
            {
                PDAnnotationLink link = (PDAnnotationLink)annotation;
                PDDestination destination = link.getDestination();
                PDAction action = link.getAction();
                if (destination == null && action instanceof PDActionGoTo)
                {
                    destination = ((PDActionGoTo) action).getDestination();
                }
                if (destination instanceof PDPageDestination)
                {
                    // TODO preserve links to pages within the split result
                    ((PDPageDestination) destination).setPage(null);
                }
            }
            // TODO preserve links to pages within the split result
            annotation.setPage(null);
        }
    }
    /**
     * The source PDF document.
     *
     * @return the pdf to be split
     */
    protected final PDDocument getSourceDocument()
    {
        return sourceDocument;
    }

    /**
     * The source PDF document.
     *
     * @return current destination pdf
     */
    protected final PDDocument getDestinationDocument()
    {
        return currentDestinationDocument;
    }
}