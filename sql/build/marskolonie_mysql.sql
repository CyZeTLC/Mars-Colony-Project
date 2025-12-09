/*==============================================================*/
/* Table: ABTEILUNG                                             */
/*==============================================================*/
create table ABTEILUNG
(
   BEREICH_ID           int not null  comment '',
   MITARBEITER_ID       numeric(8,0)  comment '',
   TAETIGKEIT           text  comment '',
   ABTEILUNG_NAME       text  comment '',
   primary key (BEREICH_ID)
);

/*==============================================================*/
/* Table: ADRESSE                                               */
/*==============================================================*/
create table ADRESSE
(
   STADT_ID             numeric(8,0) not null  comment '',
   ADRESSE_ID           numeric(8,0) not null  comment '',
   STRA_E               text  comment '',
   HAUSNUMMER           text  comment '',
   primary key (ADRESSE_ID)
);

/*==============================================================*/
/* Table: BAUT_AB                                               */
/*==============================================================*/
create table BAUT_AB
(
   BEREICH_ID           int not null  comment '',
   RESSOURCE_ID         numeric(8,0) not null  comment '',
   primary key (BEREICH_ID, RESSOURCE_ID)
);

/*==============================================================*/
/* Table: BERUFUNG                                              */
/*==============================================================*/
create table BERUFUNG
(
   BERUFUNG_ID          int not null  comment '',
   BERUFUNG_NAME        text  comment '',
   ARBEITSZEIT          float  comment '',
   ARBEITSZEIT_MODEL    text  comment '',
   primary key (BERUFUNG_ID)
);

/*==============================================================*/
/* Table: BEWOHNER                                              */
/*==============================================================*/
create table BEWOHNER
(
   ADRESSE_ID           numeric(8,0) not null  comment '',
   BEWOHNER_ID          numeric(8,0) not null  comment '',
   MITARBEITER_ID       numeric(8,0)  comment '',
   VORNAME              text  comment '',
   NACHNAME             text  comment '',
   GEB                  numeric(8,0)  comment '',
   primary key (BEWOHNER_ID)
);

/*==============================================================*/
/* Table: ENERGIEQUELLE                                         */
/*==============================================================*/
create table ENERGIEQUELLE
(
   EQ_ID                int not null  comment '',
   LAGER_ID             numeric(8,0)  comment '',
   AKTUELLE_LEISTUNG    float  comment '',
   KAPAZITAET_MAX       float  comment '',
   EQ_TYP               text  comment '',
   primary key (EQ_ID)
);

/*==============================================================*/
/* Table: FAHRZEUGE                                             */
/*==============================================================*/
create table FAHRZEUGE
(
   FAHRZEUG_ID          int not null  comment '',
   TPW_ID               int  comment '',
   F_NAME               text  comment '',
   F_STATUS             text  comment '',
   primary key (FAHRZEUG_ID)
);

/*==============================================================*/
/* Table: INVENTARLOG                                           */
/*==============================================================*/
create table INVENTARLOG
(
   LOG_ID               numeric(8,0) not null  comment '',
   RESSOURCE_ID         numeric(8,0)  comment '',
   INVENTAR_ID          numeric(8,0) not null  comment '',
   DATUM                datetime  comment '',
   primary key (LOG_ID)
);

/*==============================================================*/
/* Table: IST_GELAGERT_IN                                       */
/*==============================================================*/
create table IST_GELAGERT_IN
(
   LAGER_ID             numeric(8,0) not null  comment '',
   RESSOURCE_ID         numeric(8,0) not null  comment '',
   primary key (LAGER_ID, RESSOURCE_ID)
);

/*==============================================================*/
/* Table: KOORDINATE                                            */
/*==============================================================*/
create table KOORDINATE
(
   ID                   numeric(8,0) not null  comment '',
   STADT_ID             numeric(8,0)  comment '',
   BREITENGRAD          numeric(8,0)  comment '',
   LAENGENGRAD          numeric(8,0)  comment '',
   primary key (ID)
);

/*==============================================================*/
/* Table: LAGER                                                 */
/*==============================================================*/
create table LAGER
(
   LAGER_ID             numeric(8,0) not null  comment '',
   KOORD_ID             numeric(8,0) not null  comment '',
   LAGERTYP             text  comment '',
   GROE_E               numeric(8,0)  comment '',
   primary key (LAGER_ID)
);

/*==============================================================*/
/* Table: MITARBEITER                                           */
/*==============================================================*/
create table MITARBEITER
(
   MITARBEITER_ID       numeric(8,0) not null  comment '',
   TPW_ID               int  comment '',
   BEREICH_ID           int  comment '',
   BEWOHNER_ID          numeric(8,0) not null  comment '',
   BERUFUNG_ID          int  comment '',
   ABT_BEREICH_ID       int  comment '',
   LOGIN                text  comment '',
   PASSWORT             text  comment '',
   GEHALT               float  comment '',
   primary key (MITARBEITER_ID)
);

/*==============================================================*/
/* Table: RAUMFAHRZEUG                                          */
/*==============================================================*/
create table RAUMFAHRZEUG
(
   RF_ID                int not null  comment '',
   TPW_ID               int  comment '',
   TREIBSTOFF_STAND     float  comment '',
   TRAGLAST_KG          float  comment '',
   RF_TYP               text  comment '',
   RF_STATUS            text  comment '',
   primary key (RF_ID)
);

/*==============================================================*/
/* Table: RESSOURCE                                             */
/*==============================================================*/
create table RESSOURCE
(
   RESSOURCE_ID         numeric(8,0) not null  comment '',
   LOG_ID               numeric(8,0)  comment '',
   INVENTAR_ID          numeric(8,0)  comment '',
   R_TYP                text  comment '',
   MENGE                numeric(8,0)  comment '',
   GEWICHT              float  comment '',
   VOLUMEN              float  comment '',
   ABLAUFDATUM          datetime  comment '',
   PRIORITAET           int  comment '',
   MENGE_EINHEIT        text  comment '',
   MIN_SCHWELLENWERT    int  comment '',
   VERBRAUCH_PRO_SOL    int  comment '',
   primary key (RESSOURCE_ID)
);

/*==============================================================*/
/* Table: ROUTE                                                 */
/*==============================================================*/
create table ROUTE
(
   ROUTE_ID             int not null  comment '',
   START_ID             numeric(8,0) not null  comment '',
   END_ID               numeric(8,0) not null  comment '',
   primary key (ROUTE_ID)
);

/*==============================================================*/
/* Table: STADT                                                 */
/*==============================================================*/
create table STADT
(
   STADT_ID             numeric(8,0) not null  comment '',
   STADT_NAME           text  comment '',
   KOORD_ID             numeric(8,0)  comment '',
   primary key (STADT_ID)
);

/*==============================================================*/
/* Table: STADTINVENTAR                                         */
/*==============================================================*/
create table STADTINVENTAR
(
   INVENTAR_ID          numeric(8,0) not null  comment '',
   STADT_ID             numeric(8,0) not null  comment '',
   LOG_ID               numeric(8,0)  comment '',
   KOORD_ID             numeric(8,0) not null  comment '',
   PRIOITAT             text  comment '',
   VOLL                 smallint  comment '',
   primary key (INVENTAR_ID)
);

/*==============================================================*/
/* Table: TRANSFERFENSTER                                       */
/*==============================================================*/
create table TRANSFERFENSTER
(
   TF_ID                int not null  comment '',
   START_DATUM          datetime  comment '',
   END_DATUM            datetime  comment '',
   TS_TYP               text  comment '',
   primary key (TF_ID)
);

/*==============================================================*/
/* Table: TRANSPORTIERT                                         */
/*==============================================================*/
create table TRANSPORTIERT
(
   FAHRZEUG_ID          int not null  comment '',
   RESSOURCE_ID         numeric(8,0) not null  comment '',
   primary key (FAHRZEUG_ID, RESSOURCE_ID)
);

/*==============================================================*/
/* Table: TRANSPORTWEGE                                         */
/*==============================================================*/
create table TRANSPORTWEGE
(
   TPW_ID               int not null  comment '',
   MITARBEITER_ID       numeric(8,0) not null  comment '',
   LAGER_ID             numeric(8,0)  comment '',
   FAHRZEUG_ID          int  comment '',
   ROUTE_ID             int not null  comment '',
   RF_ID                int  comment '',
   TF_ID                int  comment '',
   STADT_ID             numeric(8,0)  comment '',
   DAUER                int  comment '',
   STREACKEN_TYP        text  comment '',
   TPW_STATUS           text  comment '',
   primary key (TPW_ID)
);

/*==============================================================*/
/* Table: VERSORGT_STADT                                        */
/*==============================================================*/
create table VERSORGT_STADT
(
   STADT_ID             numeric(8,0) not null  comment '',
   EQ_ID                int not null  comment '',
   primary key (STADT_ID, EQ_ID)
);

alter table ABTEILUNG add constraint FK_ABTEILUN_IST_LEITE_MITARBEI foreign key (MITARBEITER_ID)
      references MITARBEITER (MITARBEITER_ID) on delete restrict on update restrict;

alter table ADRESSE add constraint FK_ADRESSE_HAT_STADT foreign key (STADT_ID)
      references STADT (STADT_ID) on delete restrict on update restrict;

alter table BAUT_AB add constraint FK_BAUT_AB_BAUT_AB_ABTEILUN foreign key (BEREICH_ID)
      references ABTEILUNG (BEREICH_ID) on delete restrict on update restrict;

alter table BAUT_AB add constraint FK_BAUT_AB_BAUT_AB2_RESSOURC foreign key (RESSOURCE_ID)
      references RESSOURCE (RESSOURCE_ID) on delete restrict on update restrict;

alter table BEWOHNER add constraint FK_BEWOHNER_IST2_MITARBEI foreign key (MITARBEITER_ID)
      references MITARBEITER (MITARBEITER_ID) on delete restrict on update restrict;

alter table BEWOHNER add constraint FK_BEWOHNER_WOHNT_IN_ADRESSE foreign key (ADRESSE_ID)
      references ADRESSE (ADRESSE_ID) on delete restrict on update restrict;

alter table ENERGIEQUELLE add constraint FK_ENERGIEQ_VERSORGT__LAGER foreign key (LAGER_ID)
      references LAGER (LAGER_ID) on delete restrict on update restrict;

alter table FAHRZEUGE add constraint FK_FAHRZEUG_HAT_TRANS_TRANSPOR foreign key (TPW_ID)
      references TRANSPORTWEGE (TPW_ID) on delete restrict on update restrict;

alter table INVENTARLOG add constraint FK_INVENTAR_IST_GELOG_STADTINV foreign key (INVENTAR_ID)
      references STADTINVENTAR (INVENTAR_ID) on delete restrict on update restrict;

alter table INVENTARLOG add constraint FK_INVENTAR_IST_GELOG_RESSOURC foreign key (RESSOURCE_ID)
      references RESSOURCE (RESSOURCE_ID) on delete restrict on update restrict;

alter table IST_GELAGERT_IN add constraint FK_IST_GELA_IST_GELAG_LAGER foreign key (LAGER_ID)
      references LAGER (LAGER_ID) on delete restrict on update restrict;

alter table IST_GELAGERT_IN add constraint FK_IST_GELA_IST_GELAG_RESSOURC foreign key (RESSOURCE_ID)
      references RESSOURCE (RESSOURCE_ID) on delete restrict on update restrict;

alter table KOORDINATE add constraint FK_KOORDINA_BEFINDET__STADT foreign key (STADT_ID)
      references STADT (STADT_ID) on delete restrict on update restrict;

alter table LAGER add constraint FK_LAGER_LIEGT_IN_KOORDINA foreign key (KOORD_ID)
      references KOORDINATE (ID) on delete restrict on update restrict;

alter table MITARBEITER add constraint FK_MITARBEI_GEHOERT_Z_ABTEILUN foreign key (ABT_BEREICH_ID)
      references ABTEILUNG (BEREICH_ID) on delete restrict on update restrict;

alter table MITARBEITER add constraint FK_MITARBEI_HAT_BERUF_BERUFUNG foreign key (BERUFUNG_ID)
      references BERUFUNG (BERUFUNG_ID) on delete restrict on update restrict;

alter table MITARBEITER add constraint FK_MITARBEI_IST_BEWOHNER foreign key (BEWOHNER_ID)
      references BEWOHNER (BEWOHNER_ID) on delete restrict on update restrict;

alter table MITARBEITER add constraint FK_MITARBEI_IST_FAHRE_TRANSPOR foreign key (TPW_ID)
      references TRANSPORTWEGE (TPW_ID) on delete restrict on update restrict;

alter table MITARBEITER add constraint FK_MITARBEI_IST_LEITE_ABTEILUN foreign key (BEREICH_ID)
      references ABTEILUNG (BEREICH_ID) on delete restrict on update restrict;

alter table RAUMFAHRZEUG add constraint FK_RAUMFAHR_RS_TRANSP_TRANSPOR foreign key (TPW_ID)
      references TRANSPORTWEGE (TPW_ID) on delete restrict on update restrict;

alter table RESSOURCE add constraint FK_RESSOURC_IST_GELOG_INVENTAR foreign key (LOG_ID)
      references INVENTARLOG (LOG_ID) on delete restrict on update restrict;

alter table RESSOURCE add constraint FK_RESSOURC_IST_VERFU_STADTINV foreign key (INVENTAR_ID)
      references STADTINVENTAR (INVENTAR_ID) on delete restrict on update restrict;

alter table ROUTE add constraint FK_ROUTE_IST_ENDPU_KOORDINA foreign key (START_ID)
      references KOORDINATE (ID) on delete restrict on update restrict;

alter table ROUTE add constraint FK_ROUTE_IST_START_KOORDINA foreign key (END_ID)
      references KOORDINATE (ID) on delete restrict on update restrict;

alter table STADT add constraint FK_STADT_BEFINDET__KOORDINA foreign key (KOORD_ID)
      references KOORDINATE (ID) on delete restrict on update restrict;

alter table STADTINVENTAR add constraint FK_STADTINV_BEINHALTE_STADT foreign key (STADT_ID)
      references STADT (STADT_ID) on delete restrict on update restrict;

alter table STADTINVENTAR add constraint FK_STADTINV_IST_GELOG_INVENTAR foreign key (LOG_ID)
      references INVENTARLOG (LOG_ID) on delete restrict on update restrict;

alter table STADTINVENTAR add constraint FK_STADTINV_LIEGT_BEI_KOORDINA foreign key (KOORD_ID)
      references KOORDINATE (ID) on delete restrict on update restrict;

alter table TRANSPORTIERT add constraint FK_TRANSPOR_TRANSPORT_FAHRZEUG foreign key (FAHRZEUG_ID)
      references FAHRZEUGE (FAHRZEUG_ID) on delete restrict on update restrict;

alter table TRANSPORTIERT add constraint FK_TRANSPOR_TRANSPORT_RESSOURC foreign key (RESSOURCE_ID)
      references RESSOURCE (RESSOURCE_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_HAT_ROUTE_ROUTE foreign key (ROUTE_ID)
      references ROUTE (ROUTE_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_HAT_TRANS_FAHRZEUG foreign key (FAHRZEUG_ID)
      references FAHRZEUGE (FAHRZEUG_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_IN_FENSTE_TRANSFER foreign key (TF_ID)
      references TRANSFERFENSTER (TF_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_IST_ABHOL_LAGER foreign key (LAGER_ID)
      references LAGER (LAGER_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_IST_FAHRE_MITARBEI foreign key (MITARBEITER_ID)
      references MITARBEITER (MITARBEITER_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_IST_ZIEL_STADT foreign key (STADT_ID)
      references STADT (STADT_ID) on delete restrict on update restrict;

alter table TRANSPORTWEGE add constraint FK_TRANSPOR_RS_TRANSP_RAUMFAHR foreign key (RF_ID)
      references RAUMFAHRZEUG (RF_ID) on delete restrict on update restrict;

alter table VERSORGT_STADT add constraint FK_VERSORGT_VERSORGT__STADT foreign key (STADT_ID)
      references STADT (STADT_ID) on delete restrict on update restrict;

alter table VERSORGT_STADT add constraint FK_VERSORGT_VERSORGT__ENERGIEQ foreign key (EQ_ID)
      references ENERGIEQUELLE (EQ_ID) on delete restrict on update restrict;

