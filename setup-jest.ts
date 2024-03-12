import "jest-preset-angular/setup-jest";
import "./projects/web/src/app/shared/extensions/date.extensions";
import "./projects/web/src/app/shared/extensions/number.extensions";

import { Crypto } from "@peculiar/webcrypto";
window.crypto = new Crypto();
