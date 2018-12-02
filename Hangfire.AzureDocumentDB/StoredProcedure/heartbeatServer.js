function heartbeatServer(id, heartbeat) {
    let context = getContext();
    let collection = context.getCollection();
    let collectionLink = collection.getAltLink();
    let response = getContext().getResponse();
    let documentLink = `${collectionLink}/docs/${id}`;
    response.setBody(false);
    let result = collection.readDocument(documentLink, (error, doc) => {
        if (error) {
            throw error;
        }
        doc.last_heartbeat = heartbeat;
        let isAccepted = collection.replaceDocument(doc._self, doc, (error) => {
            if (error) {
                throw error;
            }
            response.setBody(true);
        });
        if (!isAccepted) {
            throw new Error("The call was not accepted");
        }
    });
    if (!result) {
        throw new Error("The call was not accepted");
    }
}
