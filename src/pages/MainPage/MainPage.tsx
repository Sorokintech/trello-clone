import React, { FC, useEffect } from "react";

import Header from "../../components/Header/Header";
import ProjectTab from "../../components/ProjectTab/ProjectTab";
import { mockProjectsData } from "../../assets/data/mockProjectsData";
import "./MainPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import { IProject } from "../../assets/types/types";

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: State) => state.projectData); //=>
  useEffect(() => {
    dispatch(actionCreators.setProjects(mockProjectsData));
  }, []);
  return (
    <div className="main-page">
      <Header />
      <div className="main-page__project-container">
        {projects.map((p) => (
          <ProjectTab key={p.project_id} {...p} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
