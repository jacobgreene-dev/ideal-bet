// @/app/components/Body.tsx

import React from 'react';
import ChatGPTAssistantWrapper from './ChatGPTBetAssistantWrapper';
import SavedBetsPreview from './SavedBetsPreview';

export default function Body() {
    return (
        <div>
            <ChatGPTAssistantWrapper />
            <SavedBetsPreview />
        </div>
    );
}
