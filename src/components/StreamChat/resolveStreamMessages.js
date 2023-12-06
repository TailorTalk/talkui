const resolveStreamMessages = (messages) => {
    // console.log("akash", "I am currentMessageRef", messages)
    let toDisplay = "";
    let sessionId = "";
    for (const obj of messages) {
        if (obj.session_id) {
            sessionId = obj.session_id;
        }
        if (obj.content) {
            toDisplay = toDisplay + obj.content;
        }
        if (obj.function_call) {
            const func_details = obj.function_call;
            if (func_details.name) {
                if (!toDisplay) {
                    toDisplay = "FUNCTION_CALL: " + func_details.name
                } else {
                    toDisplay = toDisplay + func_details.name
                }
            }
            if (func_details.arguments) {
                toDisplay = toDisplay + func_details.arguments
            }
        }
    }
    let msg = { "role": "assistant", "content": toDisplay }
    return {"sessionId": sessionId, "msg": msg}
}

export default resolveStreamMessages;