package tn.docsign.documentMS.entity;

import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.NoArgsConstructor;

        import org.hibernate.annotations.Fetch;
        import org.hibernate.annotations.FetchMode;

        import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ShareWithForDoc {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idShare;
    private Boolean canDelete;
    private Boolean canShare;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idDocumentSign",referencedColumnName ="idDocumentSign" )
    private DocumentSign documentSign;
    private String idUser;


}

