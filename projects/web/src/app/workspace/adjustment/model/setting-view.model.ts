import { ISetting, Setting } from "./setting.model";
import { SyncPeriod } from "./sync-period.model";

export interface ISettingView {
    email: string;
    password: string;
    passwordConfirm: string;
    syncPeriod: SyncPeriod;

    setEmail(email: string): void;
    setPeriod(period: SyncPeriod): void;
    reset(): void;
    clearPassword(): void;
    get(): ISetting;
}

export class SettingView implements ISettingView {
    private readonly _mockPassword = "xxxxxxxx";
    private _isMockPassword!: boolean;
    private _originalEmail!: string;

    public email!: string;
    public password!: string;
    public passwordConfirm!: string;
    public syncPeriod!: SyncPeriod;

    constructor() {
        this.setEmail("");
        this.setPeriod(SyncPeriod.Never);
        this.reset();
    }

    public setEmail(email: string): void {
        this.email = this._originalEmail = email;
    }

    public setPeriod(period: SyncPeriod): void {
        this.syncPeriod = period;
    }

    public reset(): void {
        this.email = this._originalEmail;
        this.password = this._mockPassword;
        this.passwordConfirm = this._mockPassword;
        this._isMockPassword = true;
    }

    public clearPassword(): void {
        if (this._isMockPassword) {
            this.password = "";
            this.passwordConfirm = "";
            this._isMockPassword = false;
        }
    }

    public get(): ISetting {
        return new Setting(
            this.email === this._originalEmail ? null : this.email,
            this._isMockPassword ? null : this.password,
            this.syncPeriod,
        );
    }
}
