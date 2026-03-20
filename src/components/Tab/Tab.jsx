import React from 'react'
import { Icon } from "@iconify/react";

export const Tab = ({text, borderTop, borderLeft, borderRight}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px", border: "1px solid #eee", cursor: "pointer" }}>
        <p style={{borderTop: borderTop, borderLeft: borderLeft, borderRight: borderRight}}>{text}</p>
        <Icon style={{ fontSize: "20px", color: "#928c8c", fontWeight: "200" }} icon="mdi:arrow-right" />
    </div>
  )
}

export default Tab
