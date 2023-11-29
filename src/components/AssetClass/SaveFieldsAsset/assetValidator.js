const fields = [
    "asset_class",
    "asset_tool_name",
    "asset_tool_short_description",
    "asset_tool_description",
    "function_schema",
    "org_id",
    "bot_id"
]

function validateSaveFieldsAsset(asset) {
    let errors = ""
    fields.forEach((field) => {
        if (!asset[field]) {
            errors += field + " is required\n"
        }
    })
    console.log("Errors in validateSaveFieldsAsset: ", errors)
    return errors
}

export default validateSaveFieldsAsset