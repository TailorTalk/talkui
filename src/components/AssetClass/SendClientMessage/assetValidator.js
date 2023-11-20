const fields = [
    "asset_class",
    "asset_tool_name",
    "asset_tool_short_description",
    "asset_tool_description",
    "bot_id"
]

function validateSendClientMsgAsset(asset) {
    // console.log("Asset in validateTextAsset: ", asset)
    let errors = ""
    fields.forEach((field) => {
        if (!asset[field]) {
            errors += field + " is required\n"
        }
    })
    return errors
}

export default validateSendClientMsgAsset