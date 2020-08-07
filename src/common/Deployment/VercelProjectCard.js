import * as React from "react";
import { useMemo } from "react";

import { Link, Button } from "components";

export const VercelProjectCard = ({ project, user, color, onRefresh }) => {
  const statusColor = useMemo(() => {
    switch (project.latestDeployments?.[0]?.readyState) {
      case "QUEUED":
        return "gray";
      case "BUILDING":
        return "yellow";
      case "READY":
        return "green";
      case "ERROR":
        return "red";
      default:
        return "gray";
    }
  }, [project]);

  return (
    <div className="flex shadow-md min-h-40">
      <div className="max-w-full flex flex-col flex-1 bg-white dark:bg-whiteAlpha-200 rounded-lg">
        <div className="flex items-center justify-between m-6">
          <Link
            className="text-xl font-semibold text-gray-800 dark:text-gray-200"
            href={`https://vercel.com/${user.username}/${project.name}`}
            target="_blank"
          >
            {project.name}
          </Link>
          <Button
            size="sm"
            variantColor={color}
            variant="ghost"
            onClick={onRefresh}
          >
            Refresh
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-start mx-6">
          <div className="w-full space-y-4">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-300 mr-3" />
              <Link
                href={`https://${project.alias?.[0].domain}`}
                target="_blank"
              >
                {project.alias?.[0].domain}
              </Link>
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full bg-${statusColor}-500 dark:bg-${statusColor}-300 mr-3`} />
              <Link
                href={`https://${project.latestDeployments?.[0].url}`}
                target="_blank"
              >
                {project.latestDeployments?.[0].url}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
