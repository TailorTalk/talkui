const fields = [
    "asset_class",
    "asset_tool_name",
    "asset_tool_short_description",
    "asset_tool_description",
    "run_instruction",
    "model_name",
    "function_schema"
]

function validateReasoningAsset(asset) {
    // console.log("Asset in validateTextAsset: ", asset)
    let errors = ""
    fields.forEach((field) => {
        if (!asset[field]) {
            errors += field + " is required\n"
        }
    })
    return errors
}

export default validateReasoningAsset