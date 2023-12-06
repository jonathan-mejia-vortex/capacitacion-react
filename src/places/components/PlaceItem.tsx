import React, { useState, useContext } from "react";

import "./PlaceItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: { lat: number; lng: number };
  onDeletePlace: (deletePlaceId: string) => void;
};

const PlaceItem = (props: Props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteModalHandler = () => setShowDeleteModal(true);
  const closeDeleteModalHandler = () => setShowDeleteModal(false);

  const confirmDeleteHandler = async () => {
    setShowDeleteModal(false);

    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/places/" + props.id,
        "DELETE"
      );

      props.onDeletePlace(props.id);
    } catch (e) {}
    
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}> CLOSE </Button>}
      >
        <div className="map-container">
          <h2> PLACEHOLDER MAP </h2>
          <h3> {props.address} </h3>
          <p> {props.coordinates.lat + " - " + props.coordinates.lng}</p>
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModalHandler}
        header="Are you sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeleteModalHandler}>
              {" "}
              CANCEL{" "}
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              {" "}
              DELETE{" "}
            </Button>
          </React.Fragment>
        }
      >
        <div className="">
          <h2>
            Do you want to proceed and delete this place? Please note that it
            can't be undone thereafter.
          </h2>
        </div>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
        {isLoading && <LoadingSpinner asOverlay/>}
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && auth.userId === props.creatorId && (
              <Button danger onClick={openDeleteModalHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
