import React from 'react'
import './LegalNotice.css'
import { Typography} from '@mui/material';

const LegalNotice = () => {
    return (
        <div className='legalnotice'>
            <h1 className='mainhead1'>Legal Notice</h1>
            <Typography>Welcome to NowGrocceries. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use:</Typography>

            <div className='legalnoticein'>
                <h2>1. Terms of Use</h2>
                <p>
                The content of the pages of this website is for your general information and use only. It is subject to change without notice.Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
                </p>
            </div>

            <div className='legalnoticein'>
                <h2>2. Terms of Use</h2>
                <p>
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </p>
            </div>

            <div className='legalnoticein'>
                <h2>3. Terms of Use</h2>
                <p>
                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.

                </p>
            </div>

            <div className='legalnoticein'>
                <h2>4. Terms of Use</h2>
                <p>
                Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense. From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                </p>
            </div>
            <Typography>Your use of this website and any dispute arising out of such use of the website is subject to the laws of India.</Typography>
        </div>
    )
}

export default LegalNotice