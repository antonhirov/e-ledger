param(
    [Parameter(Mandatory)]
    [String]$key,
    [Parameter(Mandatory)]
    [String]$userStorage,
    [Parameter(Mandatory)]
    [String]$dataStorage
)

$templatePath = ".\projects\web\src\environments\credentials.ts.template"
$contentPath =  ".\projects\web\src\environments\credentials.ts"

$content = Get-Content $templatePath -Raw
$content = $content.Replace("[WEB_API_KEY]", $key)
$content = $content.Replace("[WEB_API_USER_STORAGE_URL]", $userStorage)
$content = $content.Replace("[WEB_API_DATA_STORAGE_URL]", $dataStorage)
Set-Content $contentPath -Value($content)
