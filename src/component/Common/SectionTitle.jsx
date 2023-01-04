import React from "react";
import PropTypes from "prop-types";

const SectionTitle = ({title, classInfo}) => {
    return <h2 className={classInfo}>
         {title}
    </h2>

}

SectionTitle.prototype = {
    title: PropTypes.string.isRequired,
    classInfo: PropTypes.string.isRequired
}


export default SectionTitle;