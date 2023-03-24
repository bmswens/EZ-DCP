// React
import React from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material'

function LabeledIconButton(props) {
    const {
        onClick,
        children,
        title,
        disabled
    } = props

    return (
        <Tooltip
            title={title}
        >
            <span>
                <IconButton
                    disabled={disabled}
                    aria-label={title}
                    onClick={onClick}
                >
                    {children}
                </IconButton>
            </span>
        </Tooltip>
    )
}

export default LabeledIconButton