import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    forwardRef,
    Host,
    Provider,
    Renderer2,
    ViewContainerRef,
} from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
    BsDatepickerConfig,
    BsDatepickerDirective,
    BsDatepickerInputDirective,
    BsLocaleService,
} from "ngx-bootstrap/datepicker";
import { ComponentLoaderFactory } from "ngx-bootstrap/component-loader";

const BS_DATEPICKER_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerInputDirective),
    multi: true,
};

const BS_DATEPICKER_VALIDATOR: Provider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatepickerInputDirective),
    multi: true,
};

@Directive({
    selector: "input[elDatepicker]",
    providers: [BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR],
})
export class DatepickerInputDirective extends BsDatepickerInputDirective {
    constructor(@Host()
        picker: DatepickerDirective,
        localeService: BsLocaleService,
        renderer: Renderer2,
        elementRef: ElementRef,
        changeRef: ChangeDetectorRef,
    ) {
        super(picker, localeService, renderer, elementRef, changeRef);
    }
}

@Directive({
    selector: "[elDatepicker]",
    exportAs: "elDatepicker",
})
export class DatepickerDirective extends BsDatepickerDirective {
    constructor(
        config: BsDatepickerConfig,
        elementRef: ElementRef,
        renderer: Renderer2,
        viewContainerRef: ViewContainerRef,
        factory: ComponentLoaderFactory,
    ) {
        super(config, elementRef, renderer, viewContainerRef, factory);
        this.bsConfig = {
            isAnimated: true,
            dateInputFormat: "DD/MM/YYYY",
        };
    }
}
