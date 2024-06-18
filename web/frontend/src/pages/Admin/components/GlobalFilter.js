import React from "react";

function GlobalFilter({ filter, setFilter, className }) {
  return (
    <div className={className}>
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="🔍 Search user"
      />
    </div>
  );
}

export default GlobalFilter;
