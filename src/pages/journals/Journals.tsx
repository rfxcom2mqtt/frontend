import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import Messages from './Messages';
import config from '../../utils/config';

function JournalsPage() {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket: Socket = io(config.publicPath, { path: config.basePath+"/socket.io/"});
        setSocket(newSocket);
        //return () => newSocket.close();
    }, [setSocket]);

    return (
        <div>
            <h3>Journals</h3>
            {socket ? (
                <div className="logs-container">
                    <Messages socket={socket} />
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );
}
export default JournalsPage;
