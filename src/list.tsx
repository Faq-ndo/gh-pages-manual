import React from "react";
import { Link } from "react-router-dom";
import UserFilterComponent from "./filter";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [filter, setFilter] = React.useState<string>("");
  const [filteredMembers, setFilteredMembers] = React.useState<MemberEntity[]>([]);


  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => {
        setMembers(json)
        setFilteredMembers(json)
      });
  }, []);

  React.useEffect(() => {
    const filtered = members.filter((member) =>
      member.login.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [members, filter]);

  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
  };

  return (
    <>
      <h2>Hello from List page</h2>+{" "}
      <UserFilterComponent onFilter={handleFilter} />
      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {filteredMembers.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
