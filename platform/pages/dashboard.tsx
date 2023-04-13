/*******************************************************************/
/*                                                                 */
/*                  BLANKLY FINANCE CONFIDENTIAL                   */
/*                   _ _ _ _ _ _ _ _ _ _ _ _ _                     */
/*                                                                 */
/* Copyright 2022 Blankly Finance Incorporated                     */
/* All Rights Reserved.                                            */
/*                                                                 */
/* NOTICE:  All information contained herein is, and remains the   */
/* property of Blankly Finance Incorporated and its suppliers, if  */
/* any.  The intellectual and technical concepts contained         */
/* herein are proprietary to Blankly Finance Incorporated and its  */
/* suppliers and may be covered by U.S. and Foreign Patents,       */
/* patents in process, and are protected by trade secret or        */
/* copyright law.  Dissemination of this information or            */
/* reproduction of this material is strictly forbidden unless      */
/* prior written permission is obtained from Blankly Finance       */
/* Incorporated.                                                   */
/*                                                                 */
/*******************************************************************/

import TransparentNavLayout from "@/components/layouts/TransparentNavLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import {useAuth} from "@/libs/auth";
import CodeBackground from "@/public/code-background.svg";
import Image from "next/image";
import {useRouter} from "next/router";
import {ReactElement, useEffect, useState} from "react";
import {getProjects, getTeamProjects, updateUserProject} from "@/services/projects-store";
import dynamic from "next/dynamic";
import {useTeam} from "@/libs/team";
import {classNames} from "@/utils/general";
import Head from "next/head";

const LoadingState = dynamic(() => import("@/components/dashboard/loading-state/LoadingState"), {
  ssr: false,
});

const Dashboard = () => {
  const {user, uid, loading} = useAuth();
  const {active} = useTeam()

  const router = useRouter();
  const [projects, setProjects]: any[] = useState([]);
  const [projectLoading, setProjectLoading]: any[] = useState(true);
  const [userObj, setUser] = useState<any>({});

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin");
      } else {
        setUser(user);
        // TEMP FIX TO MAKE SURE NOONE COMES HERE
        router.push(`/${active.id}`)
      }
    }
  }, [loading, user, router, active.id]);

  useEffect(() => {
    if (active.type == 'user') {
      const unsubscribe = getProjects(active.id).onSnapshot((query) => {
        const projs = query.docs.map((doc) => {
          return {id: doc.id, ...doc.data()}
        });
        if (query.docs.length === 0 && active.id && active.id.length > 0) {
          router.push('/create'); // adds straight to project creation if no projects
        }
        setProjects(projs);
        setTimeout(() => {
          setProjectLoading(false);
        }, 500)
      }, (e: any) => {
        router.push('/dashboard')
      });
      return () => unsubscribe();
    } else {
      const unsubscribe = getTeamProjects(active.id).onSnapshot((query) => {
        const projs = query.docs.map((doc) => {
          return {id: doc.id, ...doc.data()}
        });
        if (projs.length === 0 && active.id && active.id.length > 0) {
          router.push('/create'); // adds straight to project creation if no projects
        }
        setProjects(projs);
        setTimeout(() => {
          setProjectLoading(false);
        }, 500)
      }, (e: any) => {
        router.push('/dashboard')
      });
      return () => unsubscribe();
    }
  }, [uid, active, router]); // subscription, only starts once

  return (
    <div className="min-h-screen pb-44 bg-gray-50">
      <Head>
        <title>Your Dashboard 😶</title>
      </Head>
      <div className={classNames("relative z-0", active.type === "user" ? "bg-gray-900" : "bg-blue-900")}>
        <div className="max-w-6xl relative mx-auto py-32 z-10 p-5 md:px-0">
          <div>
            <h2
              className="max-w-2xl w-4/5 md:w-full text-4xl inconsolata font-bold text-white sm:text-4xl sm:tracking-tight lg:text-5xl">
              Welcome Back, {userObj.firstName}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-5">
            <div className="flex ">
              <p className="inconsolata mt-5 text-xl md:text-2xl text-white">
                {projects.length === 0 ? "" : "Your Recent Projects"}
              </p>
            </div>
            <div>
              <button
                className="w-full flex mt-5 md:mt-0 transition duration-100 ease-in justify-center py-2 border border-transparent rounded-md px-6 shadow-sm text-md font-medium text-white bg-green-300 hover:bg-green-400 focus:ring-offset-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                onClick={() => router.push("/create")}
              >
                Start New Project
              </button>
            </div>
          </div>
        </div>
        <div className="opacity-20 md:opacity-80 w-full h-full absolute top-0 left-0 z-0">
          <Image
            layout="fill"
            objectFit="cover"
            className="background-image"
            objectPosition="center"
            src={CodeBackground}
            alt="Coding Background"
          />
        </div>
      </div>
      {
        projects.length !== 0 ?
          <nav aria-label="Projects" className="z-10">
            <div
              className="relative max-w-6xl mx-auto -mt-20 grid gap-8 grid-cols-1 p-5 md:p-0 sm:grid-cols-2 md:grid-cols-3">
              {projects.map((project: any, index: number) => {
                return (
                  <div
                    key={project.projectId}
                    className="z-5 cursor-pointer flex flex-col"
                    onClick={() => {
                      router.push(`/${project.projectId}`).then(() => {
                        updateUserProject(uid, project.projectId, {lastAccessed: Date.now() / 1000});
                      });
                    }}
                  >
                    <ProjectCard
                      date={project.lastAccessed}
                      numDeployed={3}
                      numTotal={10}
                      name={project.name}
                      id={project.id}
                      description={project.description}
                    />
                  </div>
                );
              })}
            </div>
          </nav>
          :
          <LoadingState loading={projectLoading}/>
      }
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <TransparentNavLayout>{page}</TransparentNavLayout>;
};

export default Dashboard;
