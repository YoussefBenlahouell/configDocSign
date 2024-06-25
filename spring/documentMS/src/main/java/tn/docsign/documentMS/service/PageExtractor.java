package tn.docsign.documentMS.service;


import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.pdmodel.font.PDFont.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.color.PDColor;
import org.apache.pdfbox.pdmodel.graphics.color.PDDeviceRGB;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceCharacteristicsDictionary;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDTextField;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * This class will extract one or more sequential pages and create a new document.
 * @author Adam Nichols (adam@apache.org)
 */
public class PageExtractor
{
    private static final Log LOG = LogFactory.getLog(PageExtractor.class);
    private final PDDocument sourceDocument;
    // first page to extract is page 1 (by default)
    private int startPage = 1;
    private int endPage;
    private float x= (float) (77.67457222642355/1.59);
    private float y= (float) (56.8161694292102/0.078);
    private float w= (float) (180*1.4147094796533595/1.5);
    private float h= (float) (25*1.4147094796533595/1.52);
      PDRectangle rect = new PDRectangle(x,y, w, h);

    public PageExtractor(PDDocument sourceDocument)
    {
        this.sourceDocument = sourceDocument;
        endPage = sourceDocument.getNumberOfPages();
    }

    public PageExtractor(PDDocument sourceDocument, int startPage, int endPage)
    {
        this.sourceDocument = sourceDocument;
        this.startPage = startPage;
        this.endPage = endPage;
    }

    public PDDocument extract() throws IOException
    {
        PDDocument extractedDocument = new PDDocument();
        extractedDocument.setDocumentInformation(sourceDocument.getDocumentInformation());
        extractedDocument.getDocumentCatalog().setViewerPreferences(
                sourceDocument.getDocumentCatalog().getViewerPreferences());
/*
        for (int i = startPage; i <= endPage; i++)
        {*/
            PDPage page1 = sourceDocument.getPage(1);
            PDPage page2 = sourceDocument.getPage(2);
            //PDPage imported = extractedDocument.importPage(page);

            PDFont font = PDType1Font.HELVETICA;
            PDResources resources = new PDResources();
            resources.put(COSName.HELV, font);
            PDAcroForm acroForm = new PDAcroForm(sourceDocument);
            sourceDocument.getDocumentCatalog().setAcroForm(acroForm);
            acroForm.setDefaultResources(resources);

            String defaultAppearanceString = "/Helv 0 Tf 0 g";
            acroForm.setDefaultAppearance(defaultAppearanceString);

            PDTextField textBox = new PDTextField(acroForm);
            textBox.setPartialName("SampleField");

            defaultAppearanceString = "/Helv 12 Tf 0 0 1 rg";
            textBox.setDefaultAppearance(defaultAppearanceString);

            acroForm.getFields().add(textBox);

            PDAnnotationWidget widget1 = new PDAnnotationWidget();
            PDRectangle rect = new PDRectangle(50, 750, 250, 50);
            widget1.setRectangle(rect);
            widget1.setPage(page1);
            widget1.setParent(textBox);

            // Specify 2nd annotation associated with the field
            PDAnnotationWidget widget2 = new PDAnnotationWidget();
            PDRectangle rect2 = new PDRectangle(200, 650, 100, 50);
            widget2.setRectangle(rect2);
            widget2.setPage(page2);
            widget2.setParent(textBox);

            // set green border and yellow background for 1st widget
            // if you prefer defaults, delete this code block
            PDAppearanceCharacteristicsDictionary fieldAppearance1
                    = new PDAppearanceCharacteristicsDictionary(new COSDictionary());
            fieldAppearance1.setBorderColour(new PDColor(new float[]{0,1,0}, PDDeviceRGB.INSTANCE));
            fieldAppearance1.setBackground(new PDColor(new float[]{1,1,0}, PDDeviceRGB.INSTANCE));
            widget1.setAppearanceCharacteristics(fieldAppearance1);

            // set red border and green background for 2nd widget
            // if you prefer defaults, delete this code block
            PDAppearanceCharacteristicsDictionary fieldAppearance2
                    = new PDAppearanceCharacteristicsDictionary(new COSDictionary());
            fieldAppearance2.setBorderColour(new PDColor(new float[]{1,0,0}, PDDeviceRGB.INSTANCE));
            fieldAppearance2.setBackground(new PDColor(new float[]{0,1,0}, PDDeviceRGB.INSTANCE));
            widget2.setAppearanceCharacteristics(fieldAppearance2);

            List<PDAnnotationWidget> widgets = new ArrayList<>();
            widgets.add(widget1);
            widgets.add(widget2);
            textBox.setWidgets(widgets);

            // make sure the annotations are visible on screen and paper
            widget1.setPrinted(true);
            widget2.setPrinted(true);

            // Add the annotations to the pages
            page1.getAnnotations().add(widget1);
            page2.getAnnotations().add(widget2);

            // set the field value
            textBox.setValue("Sample field");




       // }

        return extractedDocument;
    }

    public PDPage createFormInSinglePage(PDPage page) {




        return page;
    }





    public int getStartPage()
    {
        return startPage;
    }

    /**
     * Sets the first page number to be extracted.
     * @param startPage the first page number which should be extracted
     */
    public void setStartPage(int startPage)
    {
        this.startPage = startPage;
    }

    /**
     * Gets the last page number (inclusive) to be extracted.
     * @return the last page number which should be extracted
     */
    public int getEndPage()
    {
        return endPage;
    }

    /**
     * Sets the last page number to be extracted.
     * @param endPage the last page number which should be extracted
     */
    public void setEndPage(int endPage)
    {
        this.endPage = endPage;
    }
}