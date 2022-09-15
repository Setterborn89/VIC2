import React, { useState, useEffect } from "react";

function ConcertByDate() {
  useEffect(() => {
    async function getConcerts() {
      let concerts = [];

      let concertResponse = await fetch("/data/concerts");
      const concertData = await concertResponse.json();
    }
  }, []);
}
