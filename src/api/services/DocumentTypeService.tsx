import { GenericService } from "../GenericService";
import { DocumentType } from "../../models/DocumentType";

export class DocumentTypeService extends GenericService<DocumentType, number> {
    constructor() {
        super('http://localhost/api/document-type');
    }
}