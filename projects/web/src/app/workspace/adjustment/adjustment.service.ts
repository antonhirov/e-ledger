import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MessageDialog } from "../../shared/dialog/message.dialog";

@Injectable()
export class AdjustmentService {
    constructor(private _modalService: BsModalService) {}

    public showSavedDialog(
        message = "All changes saved!",
    ): BsModalRef<MessageDialog> {
        return this._modalService.show(MessageDialog, {
            initialState: {
                title: "Operation result:",
                message: message,
            },
            animated: true,
        });
    }
}
