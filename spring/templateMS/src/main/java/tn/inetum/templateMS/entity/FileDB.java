
package tn.inetum.templateMS.entity;
        import javax.persistence.*;

        import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.NoArgsConstructor;
        import org.hibernate.annotations.GenericGenerator;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FileDB {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private String type;
    @Lob
    private byte[] data;
    //
    private int   nbrPage ;
    private Double width ;
    private Double height;
    private float size;
    public FileDB(String name, String type, byte[] data,int nbrPage ,Double width,Double height,float size) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.nbrPage=nbrPage;
        this.width=width;
        this.height=height;
        this.size=size;
    }
}