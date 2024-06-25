package tn.docsign.templateMS.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class KonvaElement {


    private String nameElement;
    private String textElement;
    private int pageElement;
    private Double  xElement;
    private Double yElement;
    private Double  heightElement;
    private Double   widthElement;

    public void setVariable(Double width,Double height,Double scaleX,Double scaleY,Double x,Double y ,String fieldName,Double pageheight , int nbrpage ){
        int elementPage=0;
        for(int i=1;i<nbrpage;i++) {    if((int) (y/(i*(pageheight+31)))==1)elementPage=i; }
        this.heightElement = (scaleX == 0) ?   height :   (scaleY*height);
        this.widthElement=(scaleX == 0) ?  width : (scaleX*width)  ;
        this.yElement=  (pageheight+31*elementPage-this.heightElement+5-(y-elementPage*(pageheight)));
        this.xElement = (x-5);
        this.pageElement=elementPage;
        this.textElement=fieldName;
        this.nameElement=fieldName;


    }


}
