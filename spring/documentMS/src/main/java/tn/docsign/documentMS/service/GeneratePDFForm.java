package tn.docsign.documentMS.service;

import java.awt.geom.Rectangle2D;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.color.PDColor;
import org.apache.pdfbox.pdmodel.graphics.color.PDDeviceRGB;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceCharacteristicsDictionary;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceDictionary;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceEntry;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceStream;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDBorderStyleDictionary;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox;
import org.apache.pdfbox.pdmodel.interactive.form.PDRadioButton;
import org.apache.pdfbox.pdmodel.interactive.form.PDTextField;


public class GeneratePDFForm {

    public static void main(String[] args) throws Exception{


        PDDocument document = new PDDocument();
        PDPage page = new PDPage(PDRectangle.LETTER);
        document.addPage(page);


        PDFont font = PDType1Font.HELVETICA;
        PDResources resources = new PDResources();
        resources.put(COSName.getPDFName("Helv"), font);


        PDAcroForm acroForm = new PDAcroForm(document);
        document.getDocumentCatalog().setAcroForm(acroForm);

        acroForm.setDefaultResources(resources);




        int x = 25;
        int y = 750;

        addText(document, page, "Registration Form", x , y, true);
        y = y - 30;
        addText(document, page, "Name", x , y, false);
        addField(acroForm, page, "name", "Your Name", x + 75, y);



        document.save("my_form.pdf");
        document.close();
    }


    private static void addText(PDDocument document, PDPage page, String myText, float x, float y, boolean bold) {

        try {
            //Get Content Stream for Writing Data
            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);

            //Begin the Content stream
            contentStream.beginText();

            //Setting the font to the Content stream
            if(bold){
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            }
            else{
                contentStream.setFont(PDType1Font.HELVETICA, 12);
            }

            //Setting the position for the line
            contentStream.newLineAtOffset(x, y);

            //Adding text in the form of string
            contentStream.showText(myText);

            //Ending the content stream
            contentStream.endText();

            //Closing the content stream
            contentStream.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

    }



    private static void addField(PDAcroForm acroForm, PDPage page, String name, String defaultValue, float x, float y) {

        try {
            // Add a form field to the form.
            PDTextField textBox = new PDTextField(acroForm);
            textBox.setPartialName(name);
            acroForm.getFields().add(textBox);

            // Specify the widget annotation associated with the field
            PDAnnotationWidget widget = textBox.getWidgets().get(0);
            PDRectangle rect = new PDRectangle(x, y, 200, 15);
            widget.setRectangle(rect);
            widget.setPage(page);

            // set black border
            // if you prefer defaults, just delete this code block
            PDAppearanceCharacteristicsDictionary fieldAppearance
                    = new PDAppearanceCharacteristicsDictionary(new COSDictionary());
            fieldAppearance.setBorderColour(new PDColor(new float[]{0,0,0}, PDDeviceRGB.INSTANCE));
            // for background color if you need
            // fieldAppearance.setBackground(new PDColor(new float[]{1,1,0}, PDDeviceRGB.INSTANCE));
            widget.setAppearanceCharacteristics(fieldAppearance);

            // make sure the widget annotation is visible on screen and paper
            widget.setPrinted(true);

            // Add the widget annotation to the page
            page.getAnnotations().add(widget);

            // set the field value
            textBox.setValue(defaultValue);

        } catch (IOException e) {
            e.printStackTrace();
        }

    }







}

