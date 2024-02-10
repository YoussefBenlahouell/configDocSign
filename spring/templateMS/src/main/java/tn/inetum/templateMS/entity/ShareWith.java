package tn.inetum.templateMS.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ShareWith {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idShare;
    private Boolean canDelete;
    private Boolean canEdit;
    private Boolean canUse;
    private Boolean canShare;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idTemplate",referencedColumnName ="idTemplate" )
    private Template template;
    private String idUser;




}
