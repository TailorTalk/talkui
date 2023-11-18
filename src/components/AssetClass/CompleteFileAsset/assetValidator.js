const fields = [
    "asset_class",
    "asset_tool_name",
    "asset_tool_short_description",
    "asset_tool_description",
    "file_details"
]

function validateCompleteFileAsset(asset) {
    // console.log("Asset in validateTextAsset: ", asset)
    let errors = ""
    fields.forEach((field) => {
        if (!asset[field]) {
            errors += field + " is required\n"
        }
    })
    return errors
}

export default validateCompleteFileAsset