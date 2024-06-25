package tn.docsign.documentMS.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AttrsDTOout {
    public Integer width;
    public Long x;
    public Long y;
    public Integer height;
    public boolean draggable;
    public String name;
    public Double scaleX;
    public Double scaleY;
    public String fill;
    public Long opacity;
    public Integer cornerRadius;
    public String stroke;
    public Long strokeWidth;
    public String text;
    public Integer fontSize;
    public String fontFamily;
    public Integer padding;
    public String align;
}

