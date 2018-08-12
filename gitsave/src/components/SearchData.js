import React from "react";
import { user_query, repo_query } from "../queries/query";
import { Query } from "react-apollo";
import { DisplayUser } from "./DisplayUser";

export const SearchData = props => {
  const { user_name, repo_name } = props;
  console.log(props.user_name);
  return (
    <Query query={user_query} variables={{ user_name }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data.user.repositories);
        return (
          <div>
            {data.user.repositories.edges
              .filter(val => val.node.isFork === false)
              .map((user, index) => {
                return (
                  <div key={user.node.name}>
                    <DisplayUser
                      name={user.node.name}
                      description={user.node.description}
                    />
                  </div>
                );
              })}
          </div>
        );
      }}
    </Query>
  );
};
