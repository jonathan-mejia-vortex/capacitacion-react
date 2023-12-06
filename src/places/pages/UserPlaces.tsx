import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Place from "../../../model/Place";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const userId = useParams<{ userId: string }>().userId;
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/places/user/" + userId
        );
        setLoadedPlaces(responseData.places);
      } catch (e) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletePlaceId: string) => {
    setLoadedPlaces(prevPlaces => prevPlaces?.filter(place => place.id !== deletePlaceId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
