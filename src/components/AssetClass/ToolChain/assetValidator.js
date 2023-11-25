const fields = [
    "asset_class",
    "asset_tool_name",
    "asset_tool_short_description",
    "asset_tool_description",
    "sequence_of_tools"
]

function validateToolChainAsset(asset) {
    console.log("Asset in validateToolChainAsset: ", asset)
    let errors = ""
    fields.forEach((field) => {
        if (!asset[field]) {
            errors += field + " is required\n"
        }
    })

    console.log("Errors validateToolChainAsset: ", errors)
    return errors
}

export default validateToolChainAsset