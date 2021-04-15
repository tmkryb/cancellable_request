import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {
  axiosSwapiPlanet,
  fetchSwapiPlanet,
  getAbortController,
  getAxiosCancelSource,
} from "../api/swapi";

export const ShowPlanetComponent = () => {
  const [planetIndex, setPlanetIndex] = useState(1);
  const [requestMethod, setRequestMethod] = useState("fetch");
  const [planet, setPlanet] = useState({});
  useEffect(() => {
    const abortController = getAbortController();
    const cancelSource = getAxiosCancelSource();
    (async () => {
      let newPlanet = {};
      if (requestMethod === "fetch") {
        newPlanet = await fetchSwapiPlanet(planetIndex, abortController);
      }
      if (requestMethod === "axios") {
        newPlanet = await axiosSwapiPlanet(planetIndex, cancelSource);
      }
      setPlanet(newPlanet);
    })();
    return () => {
      abortController.abort();
      cancelSource.cancel();
    };
  }, [planetIndex, requestMethod]);
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            {planetIndex}. {planet.name}
          </CardTitle>
          <CardText>{planet.terrain}</CardText>
          <Row>
            <Col md="6">
              <Button
                onClick={() => {
                  setPlanetIndex(planetIndex + 1);
                  setRequestMethod("fetch");
                }}
              >
                Next planet (fetch)
              </Button>
            </Col>
            <Col md="6">
              <Button
                onClick={() => {
                  setPlanetIndex(planetIndex + 1);
                  setRequestMethod("axios");
                }}
              >
                Next planet (axios)
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
