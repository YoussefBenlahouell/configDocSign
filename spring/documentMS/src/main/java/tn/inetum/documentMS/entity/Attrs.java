package tn.inetum.documentMS.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class  Attrs   {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")

    private String id;
    public Double width;
    @Column(nullable = true)
    public Double x;
    @Column(nullable = true)
    public Double y;
    @Column(nullable = true)
    public Double height;
    public boolean draggable;
    public String name;
    @Column(nullable = true)
    public Double scaleX;
    @Column(nullable = true)
    public Double scaleY;
    public String fill;
    @Column(nullable = true)
    public Long opacity;
    @Column(nullable = true)
    public Integer cornerRadius;
    public String stroke;
    @Column(nullable = true)
    public Long strokeWidth;
    public String text;
    @Column(nullable = true)
    public Integer fontSize;
    public String fontFamily;
    @Column(nullable = true)
    public Integer padding;
    public String align;

}
