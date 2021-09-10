import React, { ReactElement } from 'react'

interface IProps {
    a:string
}

function test({   a         }:  IProps): ReactElement {
    return (
        <div>
            {a}
        </div>
    )
}

export default test
