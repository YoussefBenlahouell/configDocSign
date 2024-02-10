package tn.inetum.documentMS.service;
import java.io.IOException;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
 import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDSignatureField;

/**
 * An example of creating an AcroForm and an empty signature field from scratch.
 *
 * An actual signature can be added by clicking on it in Adobe Reader.
 *
 */
public final class CreateEmptySignatureForm
{
        private CreateEmptySignatureForm()
        {
        }

        public static void main(String[] args) throws IOException
        {
                // Create a new document with an empty page.
                try (PDDocument document = new PDDocument())
                {
                        PDPage page = new PDPage(PDRectangle.A4);
                        document.addPage(page);
                        PDFont font = PDType1Font.HELVETICA_BOLD;
                        PDResources resources = new PDResources();
                        resources.put(COSName.HELV, font);
                        PDAcroForm acroForm = new PDAcroForm(document);
                        document.getDocumentCatalog().setAcroForm(acroForm);
                        acroForm.setDefaultResources(resources);

                        String defaultAppearanceString = "/Helv 0 Tf 0 g";
                        acroForm.setDefaultAppearance(defaultAppearanceString);
                        // --- end of general AcroForm stuff ---

                        // Create empty signature field, it will get the name "Signature1"
                        PDSignatureField signatureField = new PDSignatureField(acroForm);
                        PDAnnotationWidget widget = signatureField.getWidgets().get(0);
                        PDRectangle rect = new PDRectangle(50, 650, 200, 50);
                        widget.setRectangle(rect);
                        widget.setPage(page);
                        widget.setPrinted(true);
                        page.getAnnotations().add(widget);
                        acroForm.getFields().add(signatureField);
                        document.save("src/main/resources/wwii3.pdf");


                }
        }
}