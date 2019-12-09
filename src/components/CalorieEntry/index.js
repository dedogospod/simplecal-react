import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

export default ({entry, deleteEntry, hideDelete}) => {
    return (
        <div className="calory-entry">
            <Row>
                <Col xs="8">
                    {hideDelete ? null : <span onClick={() => deleteEntry(entry)} className="clickable"><FontAwesomeIcon className="mr-2" icon={faBan}/></span>}
                    {entry.name}
                </Col>
                <Col xs="4" className="text-right">
                    {entry.count}
                </Col>
            </Row>
        </div>
    )
}