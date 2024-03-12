import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    {
        path: "workspace",
        loadChildren: () =>
            import("./workspace/workspace.module").then(m => m.WorkspaceModule),
    },
    { path: "**", redirectTo: "/workspace/cashflow" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
