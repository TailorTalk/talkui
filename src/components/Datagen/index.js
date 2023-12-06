import React, { useState, useEffect } from 'react';
import { createDatagenConnection } from '../../services/datagen.service';
import { useAuth } from "../../contexts/AuthContext"

function DatagenComponent({onDone, onError}) {
    const [data, setData] = useState([]);
    const [finished, setFinished] = useState(false);
    const { userInfo } = useAuth()

    useEffect(() => {
        // Define your SSE source here
        const eventSource = createDatagenConnection(userInfo);

        eventSource.onmessage = (event) => {
            // console.log("Event data", event.data)
            if (event.data === "DONE") {
                onDone();
                setFinished(true);
            }
            // Handle the new message and update state
            setData(event.data);
        };

        function onStreamEnd() {
            // console.log('Running a function at the end of the SSE stream.');
        }

        eventSource.onerror = (error) => {
            // console.log("Is finished", finished)
            if (finished) {
                // console.log('Stream has been closed!');
                // Run your function here
                onStreamEnd();
            } else {
                console.error('Error occurred:', error);
                eventSource.close();
                onError();
            }
        };

        // Clean up the EventSource when the component is unmounted
        return () => {
            eventSource.close();
        };
    }, [userInfo, finished, onDone, onError]);

    return (
        <div>
            <h4>Received Data:</h4>
            <ul>
                {data}
            </ul>
        </div>
    );
}

export default DatagenComponent;
