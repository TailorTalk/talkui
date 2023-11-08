const fields = [
    "asset_class",
    "asset_tool_name",
    "asset_tool_short_description",
    "asset_tool_description",
    "data_chunk_size",
    "overlap_chunk_size",
    "output_short_description",
    "output_description",
    "file_details"
]

function validateTextAsset(asset) {
    console.log("Asset in validateTextAsset: ", asset)
    let errors = ""
    fields.forEach((field) => {
        if (!asset[field]) {
            errors += field + " is required\n"
        }
    })
    return errors
}

export default validateTextAsset