import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import Playbar from "./Playbar";
import Playlist from "./Playlist";

export default function MusicPlayer() {
    return (
        <>
            <Playlist />
            <Playbar />
        </>
    );
}
