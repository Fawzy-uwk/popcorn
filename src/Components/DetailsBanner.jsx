import React, { useState } from "react";
import Container from "../Ui/Container";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import PosterFallback from "../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "./Genres";
import CircleRating from "./CircleRating";
import { PlayBtn } from "./PlayBtn";
import VideoPopup from "./VideoPopUp";
import { useFetch } from "../hooks/useFetch";
import LazyLoadImg from "./LazyLoadImg";

/* eslint-disable react/prop-types */
function DetailsBanner({ video, crew }) {
  const { url } = useSelector((state) => state.HomeSlice);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {loading ? (
        <div className="detailsBannerSkeleton">
          <Container className="flex gap-20 h-full">
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </Container>
        </div>
      ) : (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <LazyLoadImg
                  src={`${url.backdrop || ""}${data.backdrop_path || ""}`}
                />
              </div>
              <div className="opacity-layer"></div>
              <Container>
                <div className="content">
                  <div className="left">
                    <img
                      className="posterImg"
                      src={
                        data?.poster_path
                          ? url?.poster + data?.poster_path
                          : PosterFallback
                      }
                    />
                  </div>
                  <div className="right mb-2 md:mb-10">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>

                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={data?.genres?.map((genre) => genre.id)} />

                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayBtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM/D/YYYY")}
                          </span>
                        </div>
                      )}

                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director.map((d, i) => (
                            <a
                              key={i}
                              href={`https://en.wikipedia.org/wiki/${d.name}`}
                              target="blank"
                            >
                              {d.name}
                              {i !== director.length - 1 ? ", " : ""}
                            </a>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((w, i) => (
                            <a
                              key={i}
                              href={`https://en.wikipedia.org/wiki/${w.name}`}
                              target="blank"
                            >
                              {w.name}
                              {i !== writer.length - 1 ? ", " : ""}
                            </a>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Created By: </span>
                        <span className="text">
                          {data?.created_by?.map((c, i) => (
                            <a
                              key={i}
                              href={`https://en.wikipedia.org/wiki/${c.name}`}
                              target="blank"
                            >
                              {c.name}
                              {i !== data?.created_by?.length - 1 ? ", " : ""}
                            </a>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </Container>
            </React.Fragment>
          )}
        </>
      )}
    </div>
  );
}
export default DetailsBanner;
