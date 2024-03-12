export enum DialogMode {
    None          = 0,
    Error         = 1,
    ReAuth        = 2,
    SavedUser     = 4,
    SavedWorkflow = 8,
    Saved = SavedUser | SavedWorkflow,
}
