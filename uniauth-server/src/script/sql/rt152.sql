-- delete table foreign key constraint tenancy_id 
 alter table audit drop foreign key fk_audit_tenancy;
 alter table domain drop foreign key fk_domain_tenancy;
 alter table cfg drop foreign key  fk_cfg_tenancy;

 -- update dianrong tenancyCode from DIANRONG-WEBSITE to DIANRONG
 set sql_safe_updates = 0;
 update tenancy set code = 'DIANRONG' where code = 'DIANRONG-DIANRONG-WEBSITE'; 