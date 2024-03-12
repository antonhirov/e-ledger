import { Injectable } from "@angular/core";
import { ScssVariables } from "./model/scss.model";
import * as _ from "lodash";

@Injectable()
export class ChartService {
    public styles: { [key in ScssVariables]: string } = {
        success: "",
        primary: "",
        light: "",
        dark: "",
    };

    constructor() {
        const stypes = window.getComputedStyle(document.body);
        _.forOwn(this.styles, (_value, key: ScssVariables) => {
            this.styles[key] = stypes.getPropertyValue("--bs-" + key);
        });
    }
}
