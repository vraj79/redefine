import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { axiosInstance } from '../../../config';
import Multiselect from 'multiselect-react-dropdown';
// import { Filters } from './project/Filters';

export const Clients = () => {
    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [projects, setProjects] = useState([]);
    const [filterVal, setFilterVal] = useState([]);
    const [cities, setCities] = useState([]);
    const [active, setActive] = useState(false);

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    useEffect(() => {
        getdata();
        getCities();
    }, [])

    const getdata = async () => {
        const { data } = await axiosInstance.get(`clients/view`)
        setProjects(data)
        console.log(data);
        console.log("res.data")
    }

    const getCities = async () => {
        const { data } = await axiosInstance.get(`mastercities/view`)
        setCities(data)

    }


    const removeRow = (e) => {
        console.log(e);
        let row_id = e;
        try {
            const deleteData = axiosInstance.delete(`clients/delete/${row_id}`)
            console.log("deleted")
            getdata();
        }
        catch (error) {
            alert(error);
        }
    }

    var multiselectOptions = {
        project_status: [
            { id: "0", name: "Yet to Start" },
            { id: "1", name: "In Progress" },
            { id: "2", name: "Postponed" },
            { id: "3", name: "Cancelled" },
            { id: "4", name: "Closed" },
            { id: "5", name: "Partly Executed" },
            { id: "6", name: "Executed" }],
        billing_status: [
            { id: "0", name: "Billed" },
            { id: "1", name: "Not Billed" },
            { id: "2", name: "Partly Billed" }],
        po_status: [
            { id: "received", name: "Received" },
            { id: "awaited", name: "Awaited" },
            { id: "nopo", name: "No PO" }],
        project_payment: [
            { id: "0", name: "Paid" },
            { id: "1", name: "Partly Paid" },
            { id: "2", name: "Pending" }],
    };

    var filterValues = { ...filterVal };
    const SelectValue = (e, target) => {
        console.log(e);
        console.log(target);
        filterValues[target] = e;
        setFilterVal(filterValues);
        console.log(filterValues);
    }

    const RemoveValue = (e, target) => {
        console.log(e)
        filterValues[target] = e;
        setFilterVal(filterValues)
        console.log(filterValues);

    }
    console.log("filterValues", filterValues);

    const showFilters = () => {
        setActive(active == true ? false : true)
    }

    var filteredData = [];
    const getFilteredData = () => {
        const latestdata = [...projects];
        // console.log("entered")
        var valuesToBeFiltered = Object.keys(filterValues);
        var v = 0;
        for (var i = 0; i < latestdata.length; i++) {
            const pushDecision = false;
            // console.log(typeof(filterValues),  "type of ")
            for (var k = 0; k < valuesToBeFiltered.length; k++) {
                var Key = valuesToBeFiltered[k];
                var Value = filterValues[Key];
                // console.log("Key", Key);
                // console.log(Value, valuesToBeFiltered[k])
                // console.log("element", element);
                if (Value) {
                    var j = 0;
                    Value.forEach(val => {
                        j = (latestdata[i].status == val.id) ? j + 1 : j
                    })
                    if (j > 0) {
                        v++;
                        pushDecision = true;
                    }
                }
            }

            if (pushDecision == true) {
                if (filteredData.filter(e => e.title === latestdata[i].title).length <= 0) {
                    filteredData.push(latestdata[i]);
                }
            }
        }
        setProjects(filteredData);
        setActive(false);

    }


    const columns = [
        {
            name: 'Client Code',
            cell: (row) => <Link to={`/customers/customer-info/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }}>{row.code}</Link>,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.phone_number_1,
            sortable: true,
        },
        {
            name: 'Client Access',
            cell: (row) => <Link to={`/customers/customer-access/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn text-primary mr-1"><i className="fa-solid fa-pen-to-square"></i> Edit</Link>,
        },
        // {
        //     name: 'Date',
        //     selector: row => row.created ,
        //     // selector: row => row.created ,
        // },
        {
            name: 'Actions',
            cell: (row) => <><Link to={`/customers/update/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn mr-1"><i className="fa-solid fa-pen text-primary"></i></Link><button className='btn' onClick={(e) => removeRow(row.id)}><i className="fa-solid fa-trash-can text-danger"></i></button></>,
        },
        // {
        //     name: 'Start Date',
        //     // selector: row => row.start_date.split("T")[0],
        //     selector: row => row.start_date,
        //     sortable: true,
        // },
    ];

    return (
        <>
             <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="profile" href="//gmpg.org/xfn/11" />
        <link rel="pingback" href="https://inboxmailers.com/xmlrpc.php" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {/* Google Tag Manager for WordPress by gtm4wp.com */}
        {/* End Google Tag Manager for WordPress by gtm4wp.com */}
        {/* This site is optimized with the Yoast SEO Premium plugin v20.1 (Yoast SEO v20.1) - https://yoast.com/wordpress/plugins/seo/ */}
        <title>Inbox Mailers: Send When Your Subscribers are in their Inbox!</title>
        <meta name="description" content="Increase Inbox Engagement with Inbox Mailers, Our Platform enables you to trigger an email when your user is in their Inbox" />
        <link rel="canonical" href="https://inboxmailers.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="Increase Inbox Engagement with Inbox Mailers, Our Platform enables you to trigger an email when your user is in their Inbox" />
        <meta property="og:url" content="https://inboxmailers.com/" />
        <meta property="og:site_name" content="Inbox Mailers" />
        <meta property="article:publisher" content="https://www.facebook.com/inboxmailers" />
        <meta property="article:modified_time" content="2023-03-02T22:18:39+00:00" />
        <meta property="og:image" content="https://inboxmailers.com/wp-content/uploads/2022/01/Social-Card-Inbox-Mailers.jpg" />
        <meta property="og:image:width" content={1200} />
        <meta property="og:image:height" content={630} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://inboxmailers.com/wp-content/uploads/2022/01/Social-Card-Inbox-Mailers.jpg" />
        <meta name="twitter:site" content="@inboxmailers" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="5 minutes" />
        <meta name="google-site-verification" content="n3GBS_0jzHe3SSd5fGdCuedRNd57jbViIIROuPr9IMo" />
        {/* / Yoast SEO Premium plugin. */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="alternate" type="application/rss+xml" title="Inbox Mailers » Feed" href="https://inboxmailers.com/feed/" />
        <link rel="alternate" type="application/rss+xml" title="Inbox Mailers » Comments Feed" href="https://inboxmailers.com/comments/feed/" />
        <meta property="og:url" content="https://inboxmailers.com/ " />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="														
			Fix & Increase Deliverability 		
		Drastically improve your deliverability, inboxing, and reputation by giving the ISPs and ESPs exactly what they want, higher open rates!Use this strategy to warm up domains, IPs and grow you mail volume!		
																										
			Get 50% - 70%+ Open Rates		
		Sending while subscribers are in their inbox increases open rates by 3x - 5x. The behavior of subscribers receiving emails at this time makes the timing of your send, everything!More Opens, Clicks, & Revenue!		
																										
			ReEngage Your Dead Lists		
		Upload your dead list, a re-engagement email is automatically sent the next time your dead subscribers visit their inbox! This strategy generates a 50%+ open rate from your dead subscribers, getting them re-engaged once again!		
																										
			Timing is Everything		
		We have created the technology and network to recognize when your subscribers are in their inbox reading emails. Delivering this 'triggered' email from your ESP at the time your subscribers are in their inbox has been proven over billions of email tests to consistently generate 50% - 70% Open Rates each and every time! Increase your Open RatesIncrease your Click VolumeIncrease your Revenue per SendIncrease your Deliverability RatesIncrease your Inboxing RatesIncrease your Domain ReputationIncrease IP Health & ReputationIntegrates with your ESP seamlessly		
			
						START NOW!
					
		We are email marketing pioneers and veterans who created Inbox Mailers after using the technology for ourselves and our clients. Inbox Mailers was Created out of necessity and demand from the market for the technology and network to enable all businesses who use email marketing the opportunity to use this patent-pending technology.We know the power of the technology behind the platform, we and our clients, partners, and marketers use it and live by it. We know the complexity of Email Marketing, Deliverability, Inboxing, Segmentation, IP Address Management and Heath, Domain Reputation, Open Rates, Engagement Rates, Earnings per Click, and Send and this technology puts emailing on steroids! Try the platform and instantly start seeing the results of sending when your subscribers are in their inbox, the results are clearly seen in your own ESP. This strategy will change the way you email and will produce an instant return, sign up below and see it work for yourself!		
			
						START NOW!
					
																										
			Flexibility & Controls		
		Use many different triggered emails (offers/promotions) and control how many times your subscriber gets each triggered email.		
			Global network
		Exponentially create more opportunities to fire triggered emails when your subscribers are in their inbox whether they open your emails... or not! (in other words, they open another client's email and your triggered email gets sent!)		
			White Glove Personalized Setup Included
		Don't get overwhelmed. Each new customer gets their own personalized 'White Glove' setup session to start and connect to your ESP		
			Prebuilt Integrations & Zapier		
		Use our prebuilt integrations with many ESPs, CRMs, and mailing platforms or use the thousands of connections through Zapier to fire your triggered email.		
			Spam Checker
		Stay out of the spam folder, triggered emails get much higher engagement and that's what ISPs want and love! Quickly improve your reputation, inboxing, and deliverability across the board and have triggered emails lift all your sends.		
			Open Rates		
		ISPs and ESPs want a higher engagement ratio to avoid being marked as spam. Increase your open rates by 3x to 5x and you will quickly realize being a inbox mailer lifts the performance of all your email marketing efforts!" />  
        <meta property="og:type" content="article" />				<meta property="og:image" content="https://inboxmailers.com/wp-content/uploads/2021/01/email-marketing-software-header-small-3.png" />
        <style type="text/css" dangerouslySetInnerHTML={{__html: "\nimg.wp-smiley,\nimg.emoji {\n\tdisplay: inline !important;\n\tborder: none !important;\n\tbox-shadow: none !important;\n\theight: 1em !important;\n\twidth: 1em !important;\n\tmargin: 0 0.07em !important;\n\tvertical-align: -0.1em !important;\n\tbackground: none !important;\n\tpadding: 0 !important;\n}\n" }} />
        <link property="stylesheet" rel="stylesheet" id="dce-animations-css" href="https://inboxmailers.com/wp-content/plugins/dynamic-content-for-elementor/assets/css/animations.css?ver=1.16.6" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="wp-block-library-css" href="https://inboxmailers.com/wp-includes/css/dist/block-library/style.min.css?ver=6.1.1" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="classic-theme-styles-css" href="https://inboxmailers.com/wp-includes/css/classic-themes.min.css?ver=1" type="text/css" media="all" />
        <style id="global-styles-inline-css" type="text/css" dangerouslySetInnerHTML={{__html: "\nbody{--wp--preset--color--black: #000000;--wp--preset--color--cyan-bluish-gray: #abb8c3;--wp--preset--color--white: #ffffff;--wp--preset--color--pale-pink: #f78da7;--wp--preset--color--vivid-red: #cf2e2e;--wp--preset--color--luminous-vivid-orange: #ff6900;--wp--preset--color--luminous-vivid-amber: #fcb900;--wp--preset--color--light-green-cyan: #7bdcb5;--wp--preset--color--vivid-green-cyan: #00d084;--wp--preset--color--pale-cyan-blue: #8ed1fc;--wp--preset--color--vivid-cyan-blue: #0693e3;--wp--preset--color--vivid-purple: #9b51e0;--wp--preset--color--bg-color: #ffffff;--wp--preset--color--bd-color: #ebebeb;--wp--preset--color--text-dark: #222222;--wp--preset--color--text-light: #9693a2;--wp--preset--color--text-link: #ff5656;--wp--preset--color--text-hover: #ff5151;--wp--preset--color--text-link-2: #bf2d2d;--wp--preset--color--text-hover-2: #9e1212;--wp--preset--color--text-link-3: #680909;--wp--preset--color--text-hover-3: #4c1010;--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%);--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%);--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgba(255,105,0,1) 0%,rgb(207,46,46) 100%);--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);--wp--preset--duotone--dark-grayscale: url('#wp-duotone-dark-grayscale');--wp--preset--duotone--grayscale: url('#wp-duotone-grayscale');--wp--preset--duotone--purple-yellow: url('#wp-duotone-purple-yellow');--wp--preset--duotone--blue-red: url('#wp-duotone-blue-red');--wp--preset--duotone--midnight: url('#wp-duotone-midnight');--wp--preset--duotone--magenta-yellow: url('#wp-duotone-magenta-yellow');--wp--preset--duotone--purple-green: url('#wp-duotone-purple-green');--wp--preset--duotone--blue-orange: url('#wp-duotone-blue-orange');--wp--preset--font-size--small: 13px;--wp--preset--font-size--medium: 20px;--wp--preset--font-size--large: 36px;--wp--preset--font-size--x-large: 42px;--wp--preset--spacing--20: 0.44rem;--wp--preset--spacing--30: 0.67rem;--wp--preset--spacing--40: 1rem;--wp--preset--spacing--50: 1.5rem;--wp--preset--spacing--60: 2.25rem;--wp--preset--spacing--70: 3.38rem;--wp--preset--spacing--80: 5.06rem;}:where(.is-layout-flex){gap: 0.5em;}body .is-layout-flow > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-flow > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-flow > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-constrained > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-constrained > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width: var(--wp--style--global--content-size);margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignwide{max-width: var(--wp--style--global--wide-size);}body .is-layout-flex{display: flex;}body .is-layout-flex{flex-wrap: wrap;align-items: center;}body .is-layout-flex > *{margin: 0;}:where(.wp-block-columns.is-layout-flex){gap: 2em;}.has-black-color{color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-color{color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-color{color: var(--wp--preset--color--white) !important;}.has-pale-pink-color{color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-color{color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-color{color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-color{color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-color{color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-color{color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-color{color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-color{color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-color{color: var(--wp--preset--color--vivid-purple) !important;}.has-black-background-color{background-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-background-color{background-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-background-color{background-color: var(--wp--preset--color--white) !important;}.has-pale-pink-background-color{background-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-background-color{background-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-background-color{background-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-background-color{background-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-background-color{background-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-background-color{background-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-background-color{background-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-background-color{background-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-background-color{background-color: var(--wp--preset--color--vivid-purple) !important;}.has-black-border-color{border-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-border-color{border-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-border-color{border-color: var(--wp--preset--color--white) !important;}.has-pale-pink-border-color{border-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-border-color{border-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-border-color{border-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-border-color{border-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-border-color{border-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-border-color{border-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-border-color{border-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-border-color{border-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-border-color{border-color: var(--wp--preset--color--vivid-purple) !important;}.has-vivid-cyan-blue-to-vivid-purple-gradient-background{background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;}.has-light-green-cyan-to-vivid-green-cyan-gradient-background{background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;}.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;}.has-luminous-vivid-orange-to-vivid-red-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;}.has-very-light-gray-to-cyan-bluish-gray-gradient-background{background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;}.has-cool-to-warm-spectrum-gradient-background{background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;}.has-blush-light-purple-gradient-background{background: var(--wp--preset--gradient--blush-light-purple) !important;}.has-blush-bordeaux-gradient-background{background: var(--wp--preset--gradient--blush-bordeaux) !important;}.has-luminous-dusk-gradient-background{background: var(--wp--preset--gradient--luminous-dusk) !important;}.has-pale-ocean-gradient-background{background: var(--wp--preset--gradient--pale-ocean) !important;}.has-electric-grass-gradient-background{background: var(--wp--preset--gradient--electric-grass) !important;}.has-midnight-gradient-background{background: var(--wp--preset--gradient--midnight) !important;}.has-small-font-size{font-size: var(--wp--preset--font-size--small) !important;}.has-medium-font-size{font-size: var(--wp--preset--font-size--medium) !important;}.has-large-font-size{font-size: var(--wp--preset--font-size--large) !important;}.has-x-large-font-size{font-size: var(--wp--preset--font-size--x-large) !important;}\n.wp-block-navigation a:where(:not(.wp-element-button)){color: inherit;}\n:where(.wp-block-columns.is-layout-flex){gap: 2em;}\n.wp-block-pullquote{font-size: 1.5em;line-height: 1.6;}\n" }} />
        <link property="stylesheet" rel="stylesheet" id="trx_addons-icons-css" href="https://inboxmailers.com/wp-content/plugins/trx_addons/css/font-icons/css/trx_addons_icons.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="jquery-swiper-css" href="https://inboxmailers.com/wp-content/plugins/trx_addons/js/swiper/swiper.min.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="magnific-popup-css" href="https://inboxmailers.com/wp-content/plugins/trx_addons/js/magnific/magnific-popup.min.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="trx_addons-css" href="https://inboxmailers.com/wp-content/plugins/trx_addons/css/__styles.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="trx_addons-animation-css" href="https://inboxmailers.com/wp-content/plugins/trx_addons/css/trx_addons.animation.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="hfe-style-css" href="https://inboxmailers.com/wp-content/plugins/header-footer-elementor/assets/css/header-footer-elementor.css?ver=1.6.11" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-icons-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=5.15.0" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-frontend-legacy-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/css/frontend-legacy.min.css?ver=3.6.6" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-frontend-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/css/frontend.min.css?ver=3.6.6" type="text/css" media="all" />
        <style id="elementor-frontend-inline-css" type="text/css" dangerouslySetInnerHTML={{__html: "\n.elementor-kit-1842{--e-global-color-primary:#E8505B;--e-global-color-secondary:#54595F;--e-global-color-text:#000000;--e-global-color-accent:#000000;--e-global-color-7d76237a:#FFFFFF;--e-global-color-70ebf558:#000;--e-global-color-43dd1523:#FFF;--e-global-typography-primary-font-family:\"Roboto\";--e-global-typography-primary-font-weight:600;--e-global-typography-secondary-font-family:\"Roboto Slab\";--e-global-typography-secondary-font-weight:400;--e-global-typography-text-font-family:\"Roboto\";--e-global-typography-text-font-weight:400;--e-global-typography-accent-font-family:\"Roboto\";--e-global-typography-accent-font-weight:500;}.elementor-kit-1842 h5{color:#000000;}.elementor-kit-1842 button,.elementor-kit-1842 input[type=\"button\"],.elementor-kit-1842 input[type=\"submit\"],.elementor-kit-1842 .elementor-button{color:#000000;background-color:#FFFFFF;}.elementor-kit-1842 label{color:#000000;font-size:19px;text-transform:capitalize;line-height:0.2em;letter-spacing:0.6px;}.elementor-kit-1842 input:not([type=\"button\"]):not([type=\"submit\"]),.elementor-kit-1842 textarea,.elementor-kit-1842 .elementor-field-textual{color:#000000;background-color:#FFFFFF;border-style:solid;}.elementor-section.elementor-section-boxed > .elementor-container{max-width:1120px;}.e-container{--container-max-width:1120px;}.elementor-widget:not(:last-child){margin-bottom:0px;}.elementor-element{--widgets-spacing:0px;}{}h1.entry-title{display:var(--page-title-display);}.elementor-kit-1842 e-page-transition{background-color:#FFBC7D;}@media(max-width:1024px){.elementor-section.elementor-section-boxed > .elementor-container{max-width:1024px;}.e-container{--container-max-width:1024px;}}@media(max-width:767px){.elementor-section.elementor-section-boxed > .elementor-container{max-width:767px;}.e-container{--container-max-width:767px;}}\n.elementor-2065 .elementor-element.elementor-element-c4929c1 .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-38f5020{text-align:center;}.elementor-2065 .elementor-element.elementor-element-f6510ed .elementor-spacer-inner{--spacer-size:16px;}.elementor-2065 .elementor-element.elementor-element-5b159ac{text-align:center;}.elementor-2065 .elementor-element.elementor-element-bc86b7b .elementor-spacer-inner{--spacer-size:16px;}.elementor-2065 .elementor-element.elementor-element-0622ae7{column-gap:0px;text-align:center;}.elementor-2065 .elementor-element.elementor-element-6275b72 .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-c88938a .elementor-spacer-inner{--spacer-size:16px;}.elementor-2065 .elementor-element.elementor-element-4b33ef3{text-align:center;}.elementor-2065 .elementor-element.elementor-element-379873e .elementor-spacer-inner{--spacer-size:16px;}.elementor-2065 .elementor-element.elementor-element-89d83de{column-gap:0px;text-align:center;}.elementor-2065 .elementor-element.elementor-element-eac87b8 .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-ee03cb2 .elementor-spacer-inner{--spacer-size:16px;}.elementor-2065 .elementor-element.elementor-element-4ef881b{text-align:center;}.elementor-2065 .elementor-element.elementor-element-23630d9 .elementor-spacer-inner{--spacer-size:16px;}.elementor-2065 .elementor-element.elementor-element-b191086{column-gap:0px;text-align:center;}.elementor-2065 .elementor-element.elementor-element-91cc7b5 .elementor-spacer-inner{--spacer-size:111px;}.elementor-2065 .elementor-element.elementor-element-15e0516{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-2065 .elementor-element.elementor-element-15e0516 > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-2065 .elementor-element.elementor-element-15e0516 > .elementor-shape-top svg{width:calc(175% + 1.3px);height:421px;transform:translateX(-50%) rotateY(180deg);}.elementor-2065 .elementor-element.elementor-element-15e0516 > .elementor-shape-bottom svg{width:calc(131% + 1.3px);height:129px;}.elementor-bc-flex-widget .elementor-2065 .elementor-element.elementor-element-f5dceb1.elementor-column .elementor-column-wrap{align-items:center;}.elementor-2065 .elementor-element.elementor-element-f5dceb1.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-2065 .elementor-element.elementor-element-340c841{text-align:center;}.elementor-2065 .elementor-element.elementor-element-0834857 .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-7bfa6df{text-align:left;}.elementor-2065 .elementor-element.elementor-element-647a0cb .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-aefa9b4{color:#000000;}.elementor-2065 .elementor-element.elementor-element-8b0e27f .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-6005e86 .elementor-button{fill:#000000;color:#000000;background-color:#EC9E9E;}.elementor-2065 .elementor-element.elementor-element-3dfc6f8 .elementor-spacer-inner{--spacer-size:30px;}.elementor-2065 .elementor-element.elementor-element-b5d7a2e > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-2065 .elementor-element.elementor-element-b5d7a2e{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-2065 .elementor-element.elementor-element-b5d7a2e > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-2065 .elementor-element.elementor-element-b5d7a2e > .elementor-shape-top svg{width:calc(175% + 1.3px);height:421px;transform:translateX(-50%) rotateY(180deg);}.elementor-2065 .elementor-element.elementor-element-b5d7a2e > .elementor-shape-bottom svg{width:calc(131% + 1.3px);height:129px;}.elementor-bc-flex-widget .elementor-2065 .elementor-element.elementor-element-8364bdb.elementor-column .elementor-column-wrap{align-items:center;}.elementor-2065 .elementor-element.elementor-element-8364bdb.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-2065 .elementor-element.elementor-element-8364bdb > .elementor-column-wrap > .elementor-widget-wrap > .elementor-widget:not(.elementor-widget__width-auto):not(.elementor-widget__width-initial):not(:last-child):not(.elementor-absolute){margin-bottom:0px;}.elementor-2065 .elementor-element.elementor-element-8364bdb > .elementor-element-populated{margin:0px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-696c727 .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-0134e56{color:#000000;}.elementor-2065 .elementor-element.elementor-element-0134e56 > .elementor-widget-container{margin:0px 20px 0px 70px;}.elementor-2065 .elementor-element.elementor-element-ac8198d .elementor-spacer-inner{--spacer-size:22px;}.elementor-2065 .elementor-element.elementor-element-f2611ab .elementor-button{fill:#000000;color:#000000;background-color:#EC9E9E;}.elementor-bc-flex-widget .elementor-2065 .elementor-element.elementor-element-211156b.elementor-column .elementor-column-wrap{align-items:center;}.elementor-2065 .elementor-element.elementor-element-211156b.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-2065 .elementor-element.elementor-element-bf5ce2a{text-align:center;}.elementor-2065 .elementor-element.elementor-element-ad81283 > .elementor-container{max-width:500px;}.elementor-2065 .elementor-element.elementor-element-163cd9a .elementor-spacer-inner{--spacer-size:10px;}.elementor-2065 .elementor-element.elementor-element-7f4c7e0 .elementor-spacer-inner{--spacer-size:50px;}.elementor-2065 .elementor-element.elementor-element-fb88100 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-99d63bb .elementor-icon-wrapper{text-align:center;}.elementor-2065 .elementor-element.elementor-element-99d63bb .elementor-icon i, .elementor-2065 .elementor-element.elementor-element-99d63bb .elementor-icon svg{transform:rotate(0deg);}.elementor-2065 .elementor-element.elementor-element-9e8a2a5{text-align:center;}.elementor-2065 .elementor-element.elementor-element-4380f01 .elementor-spacer-inner{--spacer-size:19px;}.elementor-2065 .elementor-element.elementor-element-cc275bd{text-align:center;}.elementor-2065 .elementor-element.elementor-element-70d8e4e:not(.elementor-motion-effects-element-type-background) > .elementor-column-wrap, .elementor-2065 .elementor-element.elementor-element-70d8e4e > .elementor-column-wrap > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#2F2F2F;}.elementor-2065 .elementor-element.elementor-element-70d8e4e > .elementor-element-populated{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-2065 .elementor-element.elementor-element-70d8e4e > .elementor-element-populated > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-2065 .elementor-element.elementor-element-457e5f2 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-aabfdb3 .elementor-icon-wrapper{text-align:center;}.elementor-2065 .elementor-element.elementor-element-aabfdb3.elementor-view-stacked .elementor-icon{background-color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-aabfdb3.elementor-view-framed .elementor-icon, .elementor-2065 .elementor-element.elementor-element-aabfdb3.elementor-view-default .elementor-icon{color:#FFFFFF;border-color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-aabfdb3.elementor-view-framed .elementor-icon, .elementor-2065 .elementor-element.elementor-element-aabfdb3.elementor-view-default .elementor-icon svg{fill:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-aabfdb3 .elementor-icon i, .elementor-2065 .elementor-element.elementor-element-aabfdb3 .elementor-icon svg{transform:rotate(0deg);}.elementor-2065 .elementor-element.elementor-element-268869f{text-align:center;}.elementor-2065 .elementor-element.elementor-element-268869f .elementor-heading-title{color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-dc1f56a .elementor-spacer-inner{--spacer-size:19px;}.elementor-2065 .elementor-element.elementor-element-8419b8f{text-align:center;color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-4dce1f5 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-a46b73c .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-864d96a:not(.elementor-motion-effects-element-type-background) > .elementor-column-wrap, .elementor-2065 .elementor-element.elementor-element-864d96a > .elementor-column-wrap > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#2F2F2F;}.elementor-2065 .elementor-element.elementor-element-864d96a > .elementor-element-populated{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-2065 .elementor-element.elementor-element-864d96a > .elementor-element-populated > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-2065 .elementor-element.elementor-element-677eef5 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-2990e56 .elementor-icon-wrapper{text-align:center;}.elementor-2065 .elementor-element.elementor-element-2990e56.elementor-view-stacked .elementor-icon{background-color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-2990e56.elementor-view-framed .elementor-icon, .elementor-2065 .elementor-element.elementor-element-2990e56.elementor-view-default .elementor-icon{color:#FFFFFF;border-color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-2990e56.elementor-view-framed .elementor-icon, .elementor-2065 .elementor-element.elementor-element-2990e56.elementor-view-default .elementor-icon svg{fill:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-2990e56 .elementor-icon i, .elementor-2065 .elementor-element.elementor-element-2990e56 .elementor-icon svg{transform:rotate(0deg);}.elementor-2065 .elementor-element.elementor-element-8412c45{text-align:center;}.elementor-2065 .elementor-element.elementor-element-8412c45 .elementor-heading-title{color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-15faa77 .elementor-spacer-inner{--spacer-size:19px;}.elementor-2065 .elementor-element.elementor-element-a1617a6{text-align:center;color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-4ba25e1 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-e741af0 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-c4a5179 .elementor-icon-wrapper{text-align:center;}.elementor-2065 .elementor-element.elementor-element-c4a5179 .elementor-icon i, .elementor-2065 .elementor-element.elementor-element-c4a5179 .elementor-icon svg{transform:rotate(0deg);}.elementor-2065 .elementor-element.elementor-element-1c3d20e{text-align:center;}.elementor-2065 .elementor-element.elementor-element-41d85b3 .elementor-spacer-inner{--spacer-size:19px;}.elementor-2065 .elementor-element.elementor-element-ca7ca72{text-align:center;}.elementor-2065 .elementor-element.elementor-element-7853087 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-a1d5539 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-a3d3429 .elementor-icon-wrapper{text-align:center;}.elementor-2065 .elementor-element.elementor-element-a3d3429 .elementor-icon i, .elementor-2065 .elementor-element.elementor-element-a3d3429 .elementor-icon svg{transform:rotate(0deg);}.elementor-2065 .elementor-element.elementor-element-5b41ccb{text-align:center;}.elementor-2065 .elementor-element.elementor-element-ad51a0a .elementor-spacer-inner{--spacer-size:19px;}.elementor-2065 .elementor-element.elementor-element-f00ea00{text-align:center;}.elementor-2065 .elementor-element.elementor-element-31c152d:not(.elementor-motion-effects-element-type-background) > .elementor-column-wrap, .elementor-2065 .elementor-element.elementor-element-31c152d > .elementor-column-wrap > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#2F2F2F;}.elementor-2065 .elementor-element.elementor-element-31c152d > .elementor-element-populated{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-2065 .elementor-element.elementor-element-31c152d > .elementor-element-populated > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-2065 .elementor-element.elementor-element-6e0cb51 .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-cead7c1 .elementor-icon-wrapper{text-align:center;}.elementor-2065 .elementor-element.elementor-element-cead7c1.elementor-view-stacked .elementor-icon{background-color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-cead7c1.elementor-view-framed .elementor-icon, .elementor-2065 .elementor-element.elementor-element-cead7c1.elementor-view-default .elementor-icon{color:#FFFFFF;border-color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-cead7c1.elementor-view-framed .elementor-icon, .elementor-2065 .elementor-element.elementor-element-cead7c1.elementor-view-default .elementor-icon svg{fill:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-cead7c1 .elementor-icon i, .elementor-2065 .elementor-element.elementor-element-cead7c1 .elementor-icon svg{transform:rotate(0deg);}.elementor-2065 .elementor-element.elementor-element-b6517c9{text-align:center;}.elementor-2065 .elementor-element.elementor-element-b6517c9 .elementor-heading-title{color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-c0c9677 .elementor-spacer-inner{--spacer-size:19px;}.elementor-2065 .elementor-element.elementor-element-b7775d8{text-align:center;color:#FFFFFF;}.elementor-2065 .elementor-element.elementor-element-6c200dd .elementor-spacer-inner{--spacer-size:20px;}.elementor-2065 .elementor-element.elementor-element-7d81e72 .elementor-spacer-inner{--spacer-size:23px;}:root{--page-title-display:none;}@media(max-width:1024px){.elementor-2065 .elementor-element.elementor-element-15e0516:not(.elementor-motion-effects-element-type-background), .elementor-2065 .elementor-element.elementor-element-15e0516 > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-position:0px 0px;}.elementor-2065 .elementor-element.elementor-element-18887df > .elementor-element-populated{margin:0px 20px 40px 20px;--e-column-margin-right:20px;--e-column-margin-left:20px;}.elementor-2065 .elementor-element.elementor-element-18887df > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 0px 0px;}.elementor-2065 .elementor-element.elementor-element-b5d7a2e:not(.elementor-motion-effects-element-type-background), .elementor-2065 .elementor-element.elementor-element-b5d7a2e > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-position:0px 0px;}.elementor-2065 .elementor-element.elementor-element-0134e56 > .elementor-widget-container{margin:0px 20px 0px 20px;}}@media(max-width:767px){.elementor-2065 .elementor-element.elementor-element-0622ae7{column-gap:0px;}.elementor-2065 .elementor-element.elementor-element-0622ae7 > .elementor-widget-container{margin:0px 0px 25px 0px;}.elementor-2065 .elementor-element.elementor-element-89d83de > .elementor-widget-container{margin:0px 0px 25px 0px;}.elementor-2065 .elementor-element.elementor-element-15e0516:not(.elementor-motion-effects-element-type-background), .elementor-2065 .elementor-element.elementor-element-15e0516 > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-position:0px 0px;}.elementor-2065 .elementor-element.elementor-element-f5dceb1 > .elementor-element-populated{margin:30px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-18887df > .elementor-element-populated{margin:0px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-0834857 > .elementor-widget-container{margin:0px 0px 0px 0px;}.elementor-2065 .elementor-element.elementor-element-7bfa6df > .elementor-widget-container{margin:10px 10px 10px 10px;}.elementor-2065 .elementor-element.elementor-element-aefa9b4 > .elementor-widget-container{margin:1% 3% 1% 3%;}.elementor-2065 .elementor-element.elementor-element-6005e86 > .elementor-widget-container{margin:0% 0% 0% 0%;}.elementor-2065 .elementor-element.elementor-element-b5d7a2e:not(.elementor-motion-effects-element-type-background), .elementor-2065 .elementor-element.elementor-element-b5d7a2e > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-position:0px 0px;}.elementor-2065 .elementor-element.elementor-element-696c727 > .elementor-widget-container{margin:0px 0px 0px 0px;}.elementor-2065 .elementor-element.elementor-element-0134e56 > .elementor-widget-container{margin:1% 3% 1% 3%;}.elementor-2065 .elementor-element.elementor-element-f2611ab > .elementor-widget-container{margin:0% 0% 15% 0%;}.elementor-2065 .elementor-element.elementor-element-7bee83a > .elementor-element-populated{margin:0px 0px 20px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-70d8e4e > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 10px 0px;}.elementor-2065 .elementor-element.elementor-element-864d96a > .elementor-element-populated{margin:0px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-864d96a > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 10px 0px;}.elementor-2065 .elementor-element.elementor-element-a84c343 > .elementor-element-populated{margin:0px 0px 20px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-a6df906 > .elementor-element-populated{margin:0px 0px 20px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-2065 .elementor-element.elementor-element-31c152d > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 10px 0px;}}@media(min-width:768px){.elementor-2065 .elementor-element.elementor-element-f5dceb1{width:50%;}.elementor-2065 .elementor-element.elementor-element-18887df{width:50%;}.elementor-2065 .elementor-element.elementor-element-8364bdb{width:50%;}.elementor-2065 .elementor-element.elementor-element-211156b{width:50%;}}@media(max-width:1024px) and (min-width:768px){.elementor-2065 .elementor-element.elementor-element-f5dceb1{width:100%;}.elementor-2065 .elementor-element.elementor-element-18887df{width:100%;}.elementor-2065 .elementor-element.elementor-element-8364bdb{width:100%;}.elementor-2065 .elementor-element.elementor-element-211156b{width:100%;}}\n" }} />
        <link property="stylesheet" rel="stylesheet" id="dce-style-css" href="https://inboxmailers.com/wp-content/plugins/dynamic-content-for-elementor/assets/css/style.min.css?ver=1.16.6" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="dashicons-css" href="https://inboxmailers.com/wp-includes/css/dashicons.min.css?ver=6.1.1" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-pro-css" href="https://inboxmailers.com/wp-content/plugins/elementor-pro/assets/css/frontend.min.css?ver=3.7.1" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="font-awesome-5-all-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/all.min.css?ver=3.6.6" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="font-awesome-4-shim-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/v4-shims.min.css?ver=3.6.6" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="hfe-widgets-style-css" href="https://inboxmailers.com/wp-content/plugins/header-footer-elementor/inc/widgets-css/frontend.css?ver=1.6.11" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-parent-style-css" href="https://inboxmailers.com/wp-content/themes/piqes/style.css?ver=6.1.1" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-font-google_fonts-css" href="https://fonts.googleapis.com/css?family=Montserrat:300,300italic,400,400italic,500,500italic,700,700italic%7CMontserrat:300,300italic,400,400italic,500,500italic,700,700italic,900,900italic&subset=latin,latin-ext" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="fontello-icons-css" href="https://inboxmailers.com/wp-content/themes/piqes/css/font-icons/css/fontello.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-main-css" href="https://inboxmailers.com/wp-content/themes/piqes/style.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="mediaelement-css" href="https://inboxmailers.com/wp-includes/js/mediaelement/mediaelementplayer-legacy.min.css?ver=4.2.17" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="wp-mediaelement-css" href="https://inboxmailers.com/wp-includes/js/mediaelement/wp-mediaelement.min.css?ver=6.1.1" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-plugins-css" href="https://inboxmailers.com/wp-content/themes/piqes/css/__plugins.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-custom-css" href="https://inboxmailers.com/wp-content/themes/piqes/css/__custom.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-color-default-css" href="https://inboxmailers.com/wp-content/themes/piqes/css/__colors-default.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-color-dark-css" href="https://inboxmailers.com/wp-content/themes/piqes/css/__colors-dark.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-child-css" href="https://inboxmailers.com/wp-content/themes/piqes-child/style.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="trx_addons-responsive-css" href="https://inboxmailers.com/wp-content/plugins/trx_addons/css/__responsive.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="piqes-responsive-css" href="https://inboxmailers.com/wp-content/themes/piqes/css/__responsive.css" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="ecs-styles-css" href="https://inboxmailers.com/wp-content/plugins/ele-custom-skin/assets/css/ecs-style.css?ver=3.1.7" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="google-fonts-1-css" href="https://fonts.googleapis.com/css?family=Roboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&display=auto&ver=6.1.1" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-icons-shared-0-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/fontawesome.min.css?ver=5.15.3" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-icons-fa-regular-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/regular.min.css?ver=5.15.3" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-icons-fa-solid-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/solid.min.css?ver=5.15.3" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="elementor-icons-fa-brands-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/font-awesome/css/brands.min.css?ver=5.15.3" type="text/css" media="all" />
        <link rel="https://api.w.org/" href="https://inboxmailers.com/wp-json/" /><link rel="alternate" type="application/json" href="https://inboxmailers.com/wp-json/wp/v2/pages/2065" /><link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://inboxmailers.com/xmlrpc.php?rsd" />
        <link rel="wlwmanifest" type="application/wlwmanifest+xml" href="https://inboxmailers.com/wp-includes/wlwmanifest.xml" />
        <link rel="shortlink" href="https://inboxmailers.com/" />
        <link rel="alternate" type="application/json+oembed" href="https://inboxmailers.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Finboxmailers.com%2F" />
        <link rel="alternate" type="text/xml+oembed" href="https://inboxmailers.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Finboxmailers.com%2F&format=xml" />
        {/* Start of inboxmailers Zendesk Widget script */}
        {/* End of inboxmailers Zendesk Widget script */}
        {/* Start of inboxmailers Chargebee script */}
        {/* End of inboxmailers Chargebee script */}
        {/* Meta Pixel Code */}
        <noscript>&lt;img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=916950865980326&amp;ev=PageView&amp;noscript=1"
          /&gt;</noscript>
        {/* End Meta Pixel Code */}
        <meta name="google-site-verification" content="AsnVcFh-CD755wBAs-ZN1ZaN-Xw49gRVIn1Lwjbgcpo" /> {/*Code generated by SNIP (Structured Data Plugin) for WordPress. See rich-snippets.io for more information.Post ID is 4061.*/}{/*Code generated by SNIP (Structured Data Plugin) for WordPress. See rich-snippets.io for more information.Post ID is 4060.*/}{/*Code generated by SNIP (Structured Data Plugin) for WordPress. See rich-snippets.io for more information.Post ID is 4059.*/}{/*Code generated by SNIP (Structured Data Plugin) for WordPress. See rich-snippets.io for more information.Post ID is 4056.*/}
        {/* Google Tag Manager for WordPress by gtm4wp.com */}
        {/* GTM Container placement set to automatic */}
        {/* End Google Tag Manager */}
        {/* End Google Tag Manager for WordPress by gtm4wp.com */}{/* Meta Pixel Code */}
        <noscript>&lt;img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=916950865980326&amp;ev=PageView&amp;noscript=1"
          /&gt;</noscript>
        {/* End Meta Pixel Code */}
        <style type="text/css" dangerouslySetInnerHTML={{__html: ".recentcomments a{display:inline !important;padding:0 !important;margin:0 !important;}" }} /><link rel="icon" href="https://inboxmailers.com/wp-content/uploads/2021/01/cropped-email-marketing-software-header-small-3-1-32x32.png" sizes="32x32" />
        <link rel="icon" href="https://inboxmailers.com/wp-content/uploads/2021/01/cropped-email-marketing-software-header-small-3-1-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="https://inboxmailers.com/wp-content/uploads/2021/01/cropped-email-marketing-software-header-small-3-1-180x180.png" />
        <meta name="msapplication-TileImage" content="https://inboxmailers.com/wp-content/uploads/2021/01/cropped-email-marketing-software-header-small-3-1-270x270.png" />
        <style type="text/css" id="wp-custom-css" dangerouslySetInnerHTML={{__html: "\n\t\t\t/* Tooltip container */\n.tooltip {\n  position: relative;\n  display: inline-block;\n  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */\n}\n\n/* Tooltip text */\n.tooltip .tooltiptext {\n  visibility: hidden;\n/*   width: 220px; */\n\tmin-width: 125px;\n  background-color: #555;\n  color: #fff;\n  text-align: center;\n  padding: 5px;\n  border-radius: 6px;\n\n  /* Position the tooltip text */\n  position: absolute;\n  z-index: 1;\n  bottom: 125%;\n  left: 50%;\n  margin-left: -60px;\n\n  /* Fade in tooltip */\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n\n/* Tooltip arrow */\n.tooltip .tooltiptext::after {\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px;\n  border-style: solid;\n  border-color: #555 transparent transparent transparent;\n}\n\n/* Show the tooltip text when you mouse over the tooltip container */\n.tooltip:hover .tooltiptext {\n  visibility: visible;\n  opacity: 1;\n  font-size: 16px;\n  line-height: initial;\n}\t\t" }} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-dark-grayscale"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0 0.498039215686" /><feFuncG type="table" tableValues="0 0.498039215686" /><feFuncB type="table" tableValues="0 0.498039215686" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-grayscale"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0 1" /><feFuncG type="table" tableValues="0 1" /><feFuncB type="table" tableValues="0 1" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-purple-yellow"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0.549019607843 0.988235294118" /><feFuncG type="table" tableValues="0 1" /><feFuncB type="table" tableValues="0.717647058824 0.254901960784" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-blue-red"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0 1" /><feFuncG type="table" tableValues="0 0.278431372549" /><feFuncB type="table" tableValues="0.592156862745 0.278431372549" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-midnight"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0 0" /><feFuncG type="table" tableValues="0 0.647058823529" /><feFuncB type="table" tableValues="0 1" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-magenta-yellow"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0.780392156863 1" /><feFuncG type="table" tableValues="0 0.949019607843" /><feFuncB type="table" tableValues="0.352941176471 0.470588235294" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-purple-green"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0.650980392157 0.403921568627" /><feFuncG type="table" tableValues="0 1" /><feFuncB type="table" tableValues="0.447058823529 0.4" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0} focusable="false" role="none" style={{visibility: 'hidden', position: 'absolute', left: '-9999px', overflow: 'hidden'}}><defs><filter id="wp-duotone-blue-orange"><feColorMatrix colorInterpolationFilters="sRGB" type="matrix" values=" .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 .299 .587 .114 0 0 " /><feComponentTransfer colorInterpolationFilters="sRGB"><feFuncR type="table" tableValues="0.0980392156863 1" /><feFuncG type="table" tableValues="0 0.662745098039" /><feFuncB type="table" tableValues="0.847058823529 0.419607843137" /><feFuncA type="table" tableValues="1 1" /></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" /></filter></defs></svg>
        {/* GTM Container placement set to automatic */}
        {/* Google Tag Manager (noscript) */}
        <noscript>&lt;iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PN52BNB" height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"&gt;&lt;/iframe&gt;</noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="body_wrap">
          <div className="page_wrap">
            <header className="top_panel top_panel_custom top_panel_custom_1886 top_panel_custom_home-header				 without_bg_image">
              <style id="elementor-post-1886" dangerouslySetInnerHTML={{__html: ".elementor-1886 .elementor-element.elementor-element-f5dd086 .elementor-spacer-inner{--spacer-size:10px;}.elementor-1886 .elementor-element.elementor-element-a307a5b > .elementor-container{max-width:1600px;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-ab7ec7d.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-ab7ec7d.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-44d65e7.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-44d65e7.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__toggle{margin-right:auto;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .menu-item a.hfe-menu-item{padding-left:8px;padding-right:8px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .menu-item a.hfe-sub-menu-item{padding-left:calc( 8px + 20px );padding-right:8px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__layout-vertical .menu-item ul ul a.hfe-sub-menu-item{padding-left:calc( 8px + 40px );padding-right:8px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__layout-vertical .menu-item ul ul ul a.hfe-sub-menu-item{padding-left:calc( 8px + 60px );padding-right:8px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__layout-vertical .menu-item ul ul ul ul a.hfe-sub-menu-item{padding-left:calc( 8px + 80px );padding-right:8px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .menu-item a.hfe-menu-item, .elementor-1886 .elementor-element.elementor-element-edd8f23 .menu-item a.hfe-sub-menu-item{padding-top:7px;padding-bottom:7px;}body:not(.rtl) .elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child){margin-right:0px;}body.rtl .elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child){margin-left:0px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 nav:not(.hfe-nav-menu__layout-horizontal) .hfe-nav-menu > li.menu-item:not(:last-child){margin-bottom:0px;}body:not(.rtl) .elementor-1886 .elementor-element.elementor-element-edd8f23 .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item{margin-bottom:0px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 a.hfe-menu-item, .elementor-1886 .elementor-element.elementor-element-edd8f23 a.hfe-sub-menu-item{font-size:15px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .sub-menu,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown-expandible,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown .menu-item a.hfe-menu-item,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown .menu-item a.hfe-sub-menu-item{background-color:#fff;}.elementor-1886 .elementor-element.elementor-element-edd8f23 ul.sub-menu{width:220px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .sub-menu a.hfe-sub-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown li a.hfe-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown li a.hfe-sub-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown-expandible li a.hfe-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown-expandible li a.hfe-sub-menu-item{padding-top:15px;padding-bottom:15px;}.elementor-1886 .elementor-element.elementor-element-edd8f23 .sub-menu li.menu-item:not(:last-child), \n\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown li.menu-item:not(:last-child),\n\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-dropdown-expandible li.menu-item:not(:last-child){border-bottom-style:solid;border-bottom-color:#c4c4c4;border-bottom-width:1px;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-f04c293.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-f04c293.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-global-3787 > .elementor-widget-container{padding:0px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-2531730 .elementor-spacer-inner{--spacer-size:10px;}.elementor-1886 .elementor-element.elementor-element-3254014 .hfe-nav-menu__toggle{margin-right:auto;}.elementor-1886 .elementor-element.elementor-element-3254014 .menu-item a.hfe-menu-item{padding-left:15px;padding-right:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .menu-item a.hfe-sub-menu-item{padding-left:calc( 15px + 20px );padding-right:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .hfe-nav-menu__layout-vertical .menu-item ul ul a.hfe-sub-menu-item{padding-left:calc( 15px + 40px );padding-right:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .hfe-nav-menu__layout-vertical .menu-item ul ul ul a.hfe-sub-menu-item{padding-left:calc( 15px + 60px );padding-right:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .hfe-nav-menu__layout-vertical .menu-item ul ul ul ul a.hfe-sub-menu-item{padding-left:calc( 15px + 80px );padding-right:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .menu-item a.hfe-menu-item, .elementor-1886 .elementor-element.elementor-element-3254014 .menu-item a.hfe-sub-menu-item{padding-top:15px;padding-bottom:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .sub-menu,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown-expandible,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown .menu-item a.hfe-menu-item,\n\t\t\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown .menu-item a.hfe-sub-menu-item{background-color:#fff;}.elementor-1886 .elementor-element.elementor-element-3254014 ul.sub-menu{width:220px;}.elementor-1886 .elementor-element.elementor-element-3254014 .sub-menu a.hfe-sub-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown li a.hfe-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown li a.hfe-sub-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown-expandible li a.hfe-menu-item,\n\t\t\t\t\t\t .elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown-expandible li a.hfe-sub-menu-item{padding-top:15px;padding-bottom:15px;}.elementor-1886 .elementor-element.elementor-element-3254014 .sub-menu li.menu-item:not(:last-child), \n\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown li.menu-item:not(:last-child),\n\t\t\t\t\t\t.elementor-1886 .elementor-element.elementor-element-3254014 nav.hfe-dropdown-expandible li.menu-item:not(:last-child){border-bottom-style:solid;border-bottom-color:#c4c4c4;border-bottom-width:1px;}.elementor-1886 .elementor-element.elementor-element-83b6fb7:not(.elementor-motion-effects-element-type-background), .elementor-1886 .elementor-element.elementor-element-83b6fb7 > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#FFFFFF;}.elementor-1886 .elementor-element.elementor-element-83b6fb7{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-1886 .elementor-element.elementor-element-83b6fb7 > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-1886 .elementor-element.elementor-element-141ec0a .elementor-spacer-inner{--spacer-size:34px;}.elementor-1886 .elementor-element.elementor-element-66155b0 > .elementor-container{max-width:1600px;}.elementor-1886 .elementor-element.elementor-element-66155b0 > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-element-66155b0:not(.elementor-motion-effects-element-type-background), .elementor-1886 .elementor-element.elementor-element-66155b0 > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#FFFFFF4F;}.elementor-1886 .elementor-element.elementor-element-66155b0{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;padding:2% 2% 2% 2%;}.elementor-1886 .elementor-element.elementor-element-66155b0 > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-f1de8ad.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-f1de8ad.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-element-f1de8ad.elementor-column > .elementor-column-wrap > .elementor-widget-wrap{justify-content:center;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-f64f572.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-f64f572.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-menu-toggle{margin:0 auto;background-color:#E7E7E7;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu .elementor-item{font-family:\"Montserrat\", Sans-serif;font-size:15px;font-weight:300;line-height:1.1em;letter-spacing:-0.3px;word-spacing:0.1em;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main .elementor-item{color:#000000;fill:#000000;padding-left:8px;padding-right:8px;padding-top:7px;padding-bottom:7px;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main .elementor-item:hover,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main .elementor-item.elementor-item-active,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main .elementor-item.highlighted,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main .elementor-item:focus{color:#FF0000;fill:#FF0000;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main:not(.e--pointer-framed) .elementor-item:before,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main:not(.e--pointer-framed) .elementor-item:after{background-color:#FF0000;}.elementor-1886 .elementor-element.elementor-global-3789 .e--pointer-framed .elementor-item:before,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .e--pointer-framed .elementor-item:after{border-color:#FF0000;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main .elementor-item.elementor-item-active{color:#FF0000;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main:not(.e--pointer-framed) .elementor-item.elementor-item-active:before,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--main:not(.e--pointer-framed) .elementor-item.elementor-item-active:after{background-color:#FF0000;}.elementor-1886 .elementor-element.elementor-global-3789 .e--pointer-framed .elementor-item.elementor-item-active:before,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .e--pointer-framed .elementor-item.elementor-item-active:after{border-color:#FF0000;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown a, .elementor-1886 .elementor-element.elementor-global-3789 .elementor-menu-toggle{color:#000000;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown{background-color:#FFFFFF;border-style:solid;border-width:1px 1px 1px 1px;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown a:hover,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown a.elementor-item-active,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown a.highlighted,\n\t\t\t\t\t.elementor-1886 .elementor-element.elementor-global-3789 .elementor-menu-toggle:hover{color:#FFFFFF;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown .elementor-item, .elementor-1886 .elementor-element.elementor-global-3789 .elementor-nav-menu--dropdown  .elementor-sub-item{font-family:\"Montserrat\", Sans-serif;font-size:18px;font-weight:500;}.elementor-1886 .elementor-element.elementor-global-3789 div.elementor-menu-toggle{color:#B80000;}.elementor-1886 .elementor-element.elementor-global-3789 div.elementor-menu-toggle svg{fill:#B80000;}.elementor-1886 .elementor-element.elementor-element-5454f74 .elementor-spacer-inner{--spacer-size:32px;}.elementor-1886 .elementor-element.elementor-element-5454f74 > .elementor-widget-container{padding:0px 0px 8px 0px;}.elementor-1886 .elementor-element.elementor-element-382d545 > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap{align-content:flex-start;align-items:flex-start;}.elementor-1886 .elementor-element.elementor-element-382d545:not(.elementor-motion-effects-element-type-background), .elementor-1886 .elementor-element.elementor-element-382d545 > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#E00000;background-image:url(\"https://www.inboxmailers.com/wp-content/uploads/2021/04/cover-header2.jpg\");background-repeat:no-repeat;background-size:cover;}.elementor-1886 .elementor-element.elementor-element-382d545{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;margin-top:0px;margin-bottom:10px;padding:0px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-382d545 > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-1886 .elementor-element.elementor-element-e5938e4 > .elementor-element-populated{margin:0px 0px 0px 150px;--e-column-margin-right:0px;--e-column-margin-left:150px;}.elementor-1886 .elementor-element.elementor-element-e5938e4 > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-32d204c .elementor-spacer-inner{--spacer-size:23px;}.elementor-1886 .elementor-element.elementor-element-32d204c{width:100%;max-width:100%;}.elementor-1886 .elementor-element.elementor-element-7cddce46{text-align:center;width:100%;max-width:100%;}.elementor-1886 .elementor-element.elementor-element-7cddce46 .elementor-heading-title{color:#FFFFFF;font-family:\"Montserrat\", Sans-serif;font-size:39px;font-weight:700;text-transform:capitalize;font-style:normal;line-height:0.9em;letter-spacing:-1.3px;}.elementor-1886 .elementor-element.elementor-element-7cddce46 > .elementor-widget-container{margin:30px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-e4425e4{text-align:center;width:100%;max-width:100%;}.elementor-1886 .elementor-element.elementor-element-e4425e4 .elementor-heading-title{color:#FFFFFF;font-family:\"Montserrat\", Sans-serif;font-size:30px;font-weight:700;}.elementor-1886 .elementor-element.elementor-element-bf14e41{color:#FFFFFF;font-family:\"Montserrat\", Sans-serif;font-size:19px;line-height:1.5em;letter-spacing:-1.2px;width:100%;max-width:100%;}.elementor-1886 .elementor-element.elementor-element-bf14e41 > .elementor-widget-container{margin:7px 1px 1px 0px;}.elementor-1886 .elementor-element.elementor-element-8781a7c .elementor-spacer-inner{--spacer-size:10px;}.elementor-1886 .elementor-element.elementor-element-fd6a396 .elementor-button .elementor-align-icon-right{margin-left:14px;}.elementor-1886 .elementor-element.elementor-element-fd6a396 .elementor-button .elementor-align-icon-left{margin-right:14px;}.elementor-1886 .elementor-element.elementor-element-fd6a396 > .elementor-widget-container{margin:20px 0px 0px 0px;padding:3px 3px 20px 3px;}.elementor-1886 .elementor-element.elementor-element-fd6a396{width:100%;max-width:100%;align-self:center;}.elementor-1886 .elementor-element.elementor-element-ec3875e .elementor-spacer-inner{--spacer-size:15px;}.elementor-1886 .elementor-element.elementor-element-ec3875e > .elementor-widget-container{padding:3px 3px 12px 3px;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-90e4bbd.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-90e4bbd.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-element-90e4bbd.elementor-column > .elementor-column-wrap > .elementor-widget-wrap{justify-content:center;}.elementor-1886 .elementor-element.elementor-element-90e4bbd > .elementor-element-populated{margin:0px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-1886 .elementor-element.elementor-element-90e4bbd > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-d1506a7 > .elementor-widget-container{margin:30px 0px 30px 0px;}.elementor-1886 .elementor-element.elementor-element-d1506a7{width:80%;max-width:80%;}@media(max-width:1024px){.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-ab7ec7d.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-ab7ec7d.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-44d65e7.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-44d65e7.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-element-44d65e7.elementor-column > .elementor-column-wrap > .elementor-widget-wrap{justify-content:flex-start;}body:not(.rtl) .elementor-1886 .elementor-element.elementor-element-edd8f23.hfe-nav-menu__breakpoint-tablet .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child){margin-right:0px;}body .elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-nav-menu__layout-vertical .hfe-nav-menu > li.menu-item:not(:last-child){margin-bottom:0px;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-f04c293.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-f04c293.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-global-3787 > .elementor-widget-container{padding:10px 10px 10px 10px;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-7530545.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-7530545.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-bc-flex-widget .elementor-1886 .elementor-element.elementor-element-6cd86b9.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1886 .elementor-element.elementor-element-6cd86b9.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1886 .elementor-element.elementor-element-66155b0{padding:45px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-e5938e4 > .elementor-element-populated{margin:0px 20px 50px 20px;--e-column-margin-right:20px;--e-column-margin-left:20px;}.elementor-1886 .elementor-element.elementor-element-90e4bbd.elementor-column > .elementor-column-wrap > .elementor-widget-wrap{justify-content:center;}}@media(min-width:768px){.elementor-1886 .elementor-element.elementor-element-ab7ec7d{width:20%;}.elementor-1886 .elementor-element.elementor-element-44d65e7{width:43.876%;}.elementor-1886 .elementor-element.elementor-element-f04c293{width:35.788%;}.elementor-1886 .elementor-element.elementor-element-f1de8ad{width:20%;}.elementor-1886 .elementor-element.elementor-element-f64f572{width:55%;}.elementor-1886 .elementor-element.elementor-element-c109299{width:25%;}.elementor-1886 .elementor-element.elementor-element-e5938e4{width:45%;}.elementor-1886 .elementor-element.elementor-element-90e4bbd{width:54.907%;}}@media(max-width:1024px) and (min-width:768px){.elementor-1886 .elementor-element.elementor-element-ab7ec7d{width:40%;}.elementor-1886 .elementor-element.elementor-element-44d65e7{width:10%;}.elementor-1886 .elementor-element.elementor-element-f04c293{width:50%;}.elementor-1886 .elementor-element.elementor-element-e5938e4{width:100%;}.elementor-1886 .elementor-element.elementor-element-90e4bbd{width:100%;}}@media(max-width:767px){.elementor-1886 .elementor-element.elementor-element-ab7ec7d{width:80%;}.elementor-1886 .elementor-element.elementor-element-1a772f0 img{max-width:100%;}.elementor-1886 .elementor-element.elementor-element-44d65e7{width:20%;}body:not(.rtl) .elementor-1886 .elementor-element.elementor-element-edd8f23.hfe-nav-menu__breakpoint-mobile .hfe-nav-menu__layout-horizontal .hfe-nav-menu > li.menu-item:not(:last-child){margin-right:0px;}body .elementor-1886 .elementor-element.elementor-element-edd8f23 nav.hfe-nav-menu__layout-vertical .hfe-nav-menu > li.menu-item:not(:last-child){margin-bottom:0px;}.elementor-1886 .elementor-element.elementor-element-f04c293{width:20%;}.elementor-1886 .elementor-element.elementor-element-7530545{width:80%;}.elementor-1886 .elementor-element.elementor-element-abbd57d img{max-width:100%;}.elementor-1886 .elementor-element.elementor-element-6cd86b9{width:20%;}.elementor-1886 .elementor-element.elementor-element-66155b0{margin-top:49px;margin-bottom:49px;padding:0px 20px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-f1de8ad{width:50%;}.elementor-1886 .elementor-element.elementor-element-f64f572{width:50%;}.elementor-1886 .elementor-element.elementor-global-3789{--nav-menu-icon-size:24px;}.elementor-1886 .elementor-element.elementor-global-3789 .elementor-menu-toggle{border-width:3px;border-radius:100px;}.elementor-1886 .elementor-element.elementor-global-3789 > .elementor-widget-container{margin:10px 0px 0px 0px;}.elementor-1886 .elementor-element.elementor-element-c109299{width:50%;}.elementor-1886 .elementor-element.elementor-element-e5938e4 > .elementor-element-populated{margin:0px 20px 40px 20px;--e-column-margin-right:20px;--e-column-margin-left:20px;}.elementor-1886 .elementor-element.elementor-element-7cddce46{text-align:left;}.elementor-1886 .elementor-element.elementor-element-7cddce46 .elementor-heading-title{font-size:49px;}.elementor-1886 .elementor-element.elementor-element-7cddce46 > .elementor-widget-container{margin:0px 0px 19px 0px;}}" }} />		<div data-elementor-type="cpt_layouts" data-elementor-id={1886} data-post-id={2065} data-obj-id={2065} className="elementor elementor-1886 dce-elementor-post-2065">
                <div className="elementor-inner">
                  <div className="elementor-section-wrap">
                    <section className="elementor-section elementor-top-section elementor-element elementor-element-5876b88 elementor-section-full_width sc_layouts_hide_on_mobile elementor-section-height-default elementor-section-height-default" data-id="5876b88" data-element_type="section">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-f698879 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="f698879" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-f5dd086 sc_fly_static elementor-widget elementor-widget-spacer" data-id="f5dd086" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="elementor-section elementor-top-section elementor-element elementor-element-a307a5b sc_layouts_hide_on_mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="a307a5b" data-element_type="section">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-ab7ec7d sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="ab7ec7d" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-1a772f0 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="1a772f0" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <a href="https://inboxmailers.com/">
                                        <img width={1024} height={169} src="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png" className="attachment-large size-large" alt="Inbox Mailers" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png 1024w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-300x50.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-768x127.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1536x254.png 1536w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-370x61.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-760x126.png 760w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long.png 1767w" sizes="(max-width: 1024px) 100vw, 1024px" />								</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-44d65e7 sc_content_align_left sc_inner_width_none sc_layouts_column_icons_position_left" data-id="44d65e7" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-edd8f23 hfe-submenu-icon-plus hfe-submenu-animation-slide_up hfe-nav-menu__align-left hfe-link-redirect-child hfe-nav-menu__breakpoint-tablet sc_fly_static elementor-widget elementor-widget-navigation-menu" data-id="edd8f23" data-element_type="widget" data-settings="{&quot;padding_horizontal_menu_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:8,&quot;sizes&quot;:[]},&quot;padding_vertical_menu_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:7,&quot;sizes&quot;:[]},&quot;menu_space_between&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:0,&quot;sizes&quot;:[]},&quot;menu_row_space&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:0,&quot;sizes&quot;:[]},&quot;padding_horizontal_menu_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_menu_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_menu_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_menu_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_space_between_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_space_between_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_row_space_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_row_space_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;dropdown_border_radius&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;dropdown_border_radius_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;dropdown_border_radius_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;width_dropdown_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;220&quot;,&quot;sizes&quot;:[]},&quot;width_dropdown_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;width_dropdown_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_dropdown_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_dropdown_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_dropdown_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_dropdown_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:15,&quot;sizes&quot;:[]},&quot;padding_vertical_dropdown_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_dropdown_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;distance_from_menu&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;distance_from_menu_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;distance_from_menu_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_size&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_size_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_size_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_width&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_width_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_width_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_radius&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_radius_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_radius_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;padding_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;padding_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true}}" data-widget_type="navigation-menu.default">
                                  <div className="elementor-widget-container">
                                    <div className="hfe-nav-menu hfe-layout-horizontal hfe-nav-menu-layout horizontal hfe-pointer__none" data-layout="horizontal" data-last-item="cta">
                                      <div className="hfe-nav-menu__toggle elementor-clickable">
                                        <div className="hfe-nav-menu-icon">
                                          <i aria-hidden="true" tabIndex={0} className="fas fa-align-justify" />					</div>
                                      </div>
                                      <nav itemScope="itemscope" itemType="http://schema.org/SiteNavigationElement" className="hfe-nav-menu__layout-horizontal hfe-nav-menu__submenu-plus" data-toggle-icon="<i aria-hidden=&quot;true&quot; tabIndex=&quot;0&quot; className=&quot;fas fa-align-justify&quot;></i>" data-close-icon="<i aria-hidden=&quot;true&quot; tabIndex=&quot;0&quot; className=&quot;far fa-window-close&quot;></i>" data-full-width="yes"><ul id="menu-1-edd8f23" className="hfe-nav-menu"><li id="menu-item-3897" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/faq/" itemProp="url" className="hfe-menu-item">FAQ</a></li>
                                          <li id="menu-item-4131" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/our-solution/" itemProp="url" className="hfe-menu-item">The Strategy</a></li>
                                          <li id="menu-item-3899" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/app-integrations/" itemProp="url" className="hfe-menu-item">Integrations</a></li>
                                          <li id="menu-item-3900" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/case-studies/" itemProp="url" className="hfe-menu-item">Case Studies</a></li>
                                        </ul></nav>              
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-f04c293 sc_content_align_left sc_inner_width_none sc_layouts_column_icons_position_left" data-id="f04c293" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-3c96374 sc_layouts_hide_on_mobile sc_fly_static elementor-widget elementor-widget-global elementor-global-3787 elementor-widget-trx_sc_button" data-id="3c96374" data-element_type="widget" data-widget_type="trx_sc_button.default">
                                  <div className="elementor-widget-container">
                                    <div id="trx_sc_button_1264042512" className="sc_item_button sc_button_wrap sc_align_left"><a href="https://calendly.com/inboxmailers/inquiry-demo" className="sc_button hide_on_mobile sc_button_default sc_button_size_small sc_button_bg_image sc_button_icon_left" style={{backgroundImage: 'url(//inboxmailers.com/wp-content/uploads/2021/01/Footer-e1610321019401-370x266.png)'}}><span className="sc_button_text sc_align_center"><span className="sc_button_title">See Demo</span></span>{/* /.sc_button_text */}</a>{/* /.sc_button */}<a href="https://inboxmailers.com/pricing" className="sc_button hide_on_mobile sc_button_bordered sc_button_size_small sc_button_icon_left color_style_link2"><span className="sc_button_text sc_align_center"><span className="sc_button_title">Signup</span></span>{/* /.sc_button_text */}</a>{/* /.sc_button */}<a href="https://app.inboxmailers.com/" className="sc_button hide_on_mobile sc_button_bordered sc_button_size_small sc_button_icon_top color_style_link2"><span className="sc_button_text"><span className="sc_button_title">Log-In</span></span>{/* /.sc_button_text */}</a>{/* /.sc_button */}</div>{/* /.sc_item_button */}		</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="elementor-section elementor-top-section elementor-element elementor-element-34d4787 elementor-section-full_width sc_layouts_hide_on_mobile elementor-section-height-default elementor-section-height-default" data-id="34d4787" data-element_type="section">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-95515ac sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="95515ac" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-2531730 sc_fly_static elementor-widget elementor-widget-spacer" data-id={2531730} data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="elementor-section elementor-top-section elementor-element elementor-element-fd5537c sc_layouts_hide_on_wide sc_layouts_hide_on_desktop sc_layouts_hide_on_notebook sc_layouts_hide_on_tablet elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="fd5537c" data-element_type="section">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7530545 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id={7530545} data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-abbd57d dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="abbd57d" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <a href="https://inboxmailers.com/">
                                        <img width={1024} height={169} src="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png" className="attachment-large size-large" alt="Inbox Mailers" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png 1024w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-300x50.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-768x127.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1536x254.png 1536w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-370x61.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-760x126.png 760w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long.png 1767w" sizes="(max-width: 1024px) 100vw, 1024px" />								</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-66 elementor-top-column elementor-element elementor-element-6cd86b9 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="6cd86b9" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-3254014 hfe-submenu-icon-plus hfe-submenu-animation-slide_up hfe-nav-menu__align-left hfe-link-redirect-child hfe-nav-menu__breakpoint-tablet sc_fly_static elementor-widget elementor-widget-navigation-menu" data-id={3254014} data-element_type="widget" data-settings="{&quot;padding_horizontal_menu_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:15,&quot;sizes&quot;:[]},&quot;padding_horizontal_menu_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_menu_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_menu_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:15,&quot;sizes&quot;:[]},&quot;padding_vertical_menu_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_menu_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_space_between&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_space_between_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_space_between_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_row_space&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_row_space_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;menu_row_space_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;dropdown_border_radius&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;dropdown_border_radius_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;dropdown_border_radius_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;width_dropdown_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;220&quot;,&quot;sizes&quot;:[]},&quot;width_dropdown_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;width_dropdown_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_dropdown_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_dropdown_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_horizontal_dropdown_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_dropdown_item&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:15,&quot;sizes&quot;:[]},&quot;padding_vertical_dropdown_item_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding_vertical_dropdown_item_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;distance_from_menu&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;distance_from_menu_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;distance_from_menu_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_size&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_size_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_size_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_width&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_width_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_width_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_radius&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_radius_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;toggle_border_radius_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;padding&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;padding_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true},&quot;padding_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;top&quot;:&quot;&quot;,&quot;right&quot;:&quot;&quot;,&quot;bottom&quot;:&quot;&quot;,&quot;left&quot;:&quot;&quot;,&quot;isLinked&quot;:true}}" data-widget_type="navigation-menu.default">
                                  <div className="elementor-widget-container">
                                    <div className="hfe-nav-menu hfe-layout-horizontal hfe-nav-menu-layout horizontal hfe-pointer__none" data-layout="horizontal" data-last-item="cta">
                                      <div className="hfe-nav-menu__toggle elementor-clickable">
                                        <div className="hfe-nav-menu-icon">
                                          <i aria-hidden="true" tabIndex={0} className="fas fa-align-justify" />					</div>
                                      </div>
                                      <nav itemScope="itemscope" itemType="http://schema.org/SiteNavigationElement" className="hfe-nav-menu__layout-horizontal hfe-nav-menu__submenu-plus" data-toggle-icon="<i aria-hidden=&quot;true&quot; tabIndex=&quot;0&quot; className=&quot;fas fa-align-justify&quot;></i>" data-close-icon="<i aria-hidden=&quot;true&quot; tabIndex=&quot;0&quot; className=&quot;far fa-window-close&quot;></i>" data-full-width="yes"><ul id="menu-1-3254014" className="hfe-nav-menu"><li id="menu-item-3897" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/faq/" itemProp="url" className="hfe-menu-item">FAQ</a></li>
                                          <li id="menu-item-4131" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/our-solution/" itemProp="url" className="hfe-menu-item">The Strategy</a></li>
                                          <li id="menu-item-3899" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/app-integrations/" itemProp="url" className="hfe-menu-item">Integrations</a></li>
                                          <li id="menu-item-3900" itemProp="name" className="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"><a href="https://inboxmailers.com/case-studies/" itemProp="url" className="hfe-menu-item">Case Studies</a></li>
                                        </ul></nav>              
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section data-dce-background-color="#FFFFFF" className="elementor-section elementor-top-section elementor-element elementor-element-83b6fb7 elementor-section-full_width elementor-section-stretched sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile elementor-section-height-default elementor-section-height-default" data-id="83b6fb7" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-c888404 sc_layouts_hide_on_wide sc_layouts_hide_on_desktop sc_layouts_hide_on_notebook sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="c888404" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-141ec0a sc_fly_static elementor-widget elementor-widget-spacer" data-id="141ec0a" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <section data-dce-background-color="#FFFFFF4F" className="elementor-section elementor-inner-section elementor-element elementor-element-66155b0 elementor-section-content-middle sc_layouts_row sc_layouts_row_type_normal sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="66155b0" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                  <div className="elementor-container elementor-column-gap-narrow">
                                    <div className="elementor-row">
                                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-f1de8ad sc_content_align_center sc_inner_width_none sc_layouts_column_icons_position_left" data-id="f1de8ad" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-75e3cdf dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="75e3cdf" data-element_type="widget" data-widget_type="image.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-image">
                                                  <a href="https://inboxmailers.com/">
                                                    <img width={1024} height={169} src="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png" className="attachment-large size-large" alt="Inbox Mailers" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png 1024w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-300x50.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-768x127.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1536x254.png 1536w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-370x61.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-760x126.png 760w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long.png 1767w" sizes="(max-width: 1024px) 100vw, 1024px" />								</a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-50 elementor-inner-column elementor-element elementor-element-f64f572 sc_layouts_column_align_left sc_layouts_column sc_content_align_left sc_inner_width_none sc_layouts_column_icons_position_left" data-id="f64f572" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-58430f5 elementor-nav-menu__align-left elementor-nav-menu--dropdown-mobile elementor-nav-menu--stretch elementor-nav-menu__text-align-aside elementor-nav-menu--toggle elementor-nav-menu--burger sc_fly_static elementor-widget elementor-widget-global elementor-global-3789 elementor-widget-nav-menu" data-id="58430f5" data-element_type="widget" data-settings="{&quot;full_width&quot;:&quot;stretch&quot;,&quot;layout&quot;:&quot;horizontal&quot;,&quot;submenu_icon&quot;:{&quot;value&quot;:&quot;fas fa-caret-down&quot;,&quot;library&quot;:&quot;fa-solid&quot;},&quot;toggle&quot;:&quot;burger&quot;}" data-widget_type="nav-menu.default">
                                              <div className="elementor-widget-container">
                                                <nav migration_allowed={1} migrated={0} role="navigation" className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-underline e--animation-fade">
                                                  <ul id="menu-1-58430f5" className="elementor-nav-menu"><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3897"><a href="https://inboxmailers.com/faq/" className="elementor-item">FAQ</a></li>
                                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4131"><a href="https://inboxmailers.com/our-solution/" className="elementor-item">The Strategy</a></li>
                                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3899"><a href="https://inboxmailers.com/app-integrations/" className="elementor-item">Integrations</a></li>
                                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3900"><a href="https://inboxmailers.com/case-studies/" className="elementor-item">Case Studies</a></li>
                                                  </ul>			</nav>
                                                <div className="elementor-menu-toggle" role="button" tabIndex={0} aria-label="Menu Toggle" aria-expanded="false">
                                                  <i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--open eicon-menu-bar" /><i aria-hidden="true" role="presentation" className="elementor-menu-toggle__icon--close eicon-close" />			<span className="elementor-screen-only">Menu</span>
                                                </div>
                                                <nav className="elementor-nav-menu--dropdown elementor-nav-menu__container" role="navigation" aria-hidden="true">
                                                  <ul id="menu-2-58430f5" className="elementor-nav-menu"><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3897"><a href="https://inboxmailers.com/faq/" className="elementor-item" tabIndex={-1}>FAQ</a></li>
                                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4131"><a href="https://inboxmailers.com/our-solution/" className="elementor-item" tabIndex={-1}>The Strategy</a></li>
                                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3899"><a href="https://inboxmailers.com/app-integrations/" className="elementor-item" tabIndex={-1}>Integrations</a></li>
                                                    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3900"><a href="https://inboxmailers.com/case-studies/" className="elementor-item" tabIndex={-1}>Case Studies</a></li>
                                                  </ul>			</nav>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-c109299 sc_layouts_column_align_right sc_layouts_column sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="c109299" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-86480cb sc_layouts_hide_on_mobile sc_fly_static elementor-widget elementor-widget-global elementor-global-3787 elementor-widget-trx_sc_button" data-id="86480cb" data-element_type="widget" data-widget_type="trx_sc_button.default">
                                              <div className="elementor-widget-container">
                                                <div id="trx_sc_button_1588054750" className="sc_item_button sc_button_wrap sc_align_left"><a href="https://calendly.com/inboxmailers/inquiry-demo" className="sc_button hide_on_mobile sc_button_default sc_button_size_small sc_button_bg_image sc_button_icon_left" style={{backgroundImage: 'url(//inboxmailers.com/wp-content/uploads/2021/01/Footer-e1610321019401-370x266.png)'}}><span className="sc_button_text sc_align_center"><span className="sc_button_title">See Demo</span></span>{/* /.sc_button_text */}</a>{/* /.sc_button */}<a href="https://inboxmailers.com/pricing" className="sc_button hide_on_mobile sc_button_bordered sc_button_size_small sc_button_icon_left color_style_link2"><span className="sc_button_text sc_align_center"><span className="sc_button_title">Signup</span></span>{/* /.sc_button_text */}</a>{/* /.sc_button */}<a href="https://app.inboxmailers.com/" className="sc_button hide_on_mobile sc_button_bordered sc_button_size_small sc_button_icon_top color_style_link2"><span className="sc_button_text"><span className="sc_button_title">Log-In</span></span>{/* /.sc_button_text */}</a>{/* /.sc_button */}</div>{/* /.sc_item_button */}		</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <div className="sc_layouts_item elementor-element elementor-element-5454f74 sc_fly_static elementor-widget elementor-widget-spacer" data-id="5454f74" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section data-dce-background-color="#E00000" data-dce-background-image-url="https://www.inboxmailers.com/wp-content/uploads/2021/04/cover-header2.jpg" className="elementor-section elementor-top-section elementor-element elementor-element-382d545 elementor-section-full_width elementor-section-stretched elementor-reverse-tablet elementor-reverse-mobile elementor-section-content-top sc_layouts_row_fixed sc_layouts_row_fixed_always elementor-section-height-default elementor-section-height-default" data-id="382d545" data-element_type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
                      <div className="elementor-container elementor-column-gap-default">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-e5938e4 sc_inner_width_1_2 sc_content_align_center sc_layouts_column_align_left sc_layouts_column sc-tablet_inner_width_1_1 sc-tablet_content_align_left sc_layouts_column_icons_position_left" data-id="e5938e4" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-32d204c elementor-widget__width-inherit sc_fly_static elementor-widget elementor-widget-spacer" data-id="32d204c" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-7cddce46 scheme_default sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile elementor-widget__width-inherit sc_fly_static elementor-widget elementor-widget-heading" data-id="7cddce46" data-element_type="widget" data-widget_type="heading.default">
                                  <div className="elementor-widget-container">
                                    <h5 className="elementor-heading-title elementor-size-medium">Send When Your Subscribers are in their Inbox <br />Reading Emails</h5>		</div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-e4425e4 sc_layouts_hide_on_wide sc_layouts_hide_on_desktop sc_layouts_hide_on_notebook elementor-widget__width-inherit sc_fly_static elementor-widget elementor-widget-heading" data-id="e4425e4" data-element_type="widget" data-widget_type="heading.default">
                                  <div className="elementor-widget-container">
                                    <h2 className="elementor-heading-title elementor-size-default">Send When Your Subscribers are in their Inbox Reading Emails.</h2>		</div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-bf14e41 scheme_default elementor-widget__width-inherit sc_fly_static elementor-widget elementor-widget-text-editor" data-id="bf14e41" data-element_type="widget" data-widget_type="text-editor.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-text-editor elementor-clearfix">
                                      <p>We enable brands the ability to know when subscribers are in their inbox while instantly triggering an email from your ESP that pops to the top of their inbox and generates a 50% – 70%+ Open Rate, generating a much higher engagement, clicks, and revenue per send!</p>					</div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-8781a7c sc_fly_static elementor-widget elementor-widget-spacer" data-id="8781a7c" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-fd6a396 elementor-align-center elementor-widget__width-inherit sc_fly_static elementor-widget elementor-widget-button" data-id="fd6a396" data-element_type="widget" data-widget_type="button.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-button-wrapper">
                                      <a href="https://calendly.com/inboxmailers/inquiry-demo" className="elementor-button-link elementor-button elementor-size-xl" role="button">
                                        <span className="elementor-button-content-wrapper">
                                          <span className="elementor-button-icon elementor-align-icon-right">
                                            <i aria-hidden="true" className="far fa-arrow-alt-circle-right" />			</span>
                                          <span className="elementor-button-text">See a Demo</span>
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-ec3875e sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile sc_fly_static elementor-widget elementor-widget-spacer" data-id="ec3875e" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-90e4bbd sc-tablet_inner_width_none sc-tablet_content_align_center sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="90e4bbd" data-element_type="column" id="vid">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-d1506a7 elementor-widget__width-initial dce_masking-none elementor-aspect-ratio-169 sc_fly_static elementor-widget elementor-widget-video" data-id="d1506a7" data-element_type="widget" data-settings="{&quot;video_type&quot;:&quot;vimeo&quot;,&quot;show_image_overlay&quot;:&quot;yes&quot;,&quot;image_overlay&quot;:{&quot;url&quot;:&quot;https:\/\/inboxmailers.com\/wp-content\/uploads\/2021\/01\/StartScreen-Final.jpg&quot;,&quot;id&quot;:4828,&quot;alt&quot;:&quot;&quot;,&quot;source&quot;:&quot;library&quot;},&quot;aspect_ratio&quot;:&quot;169&quot;}" data-widget_type="video.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-wrapper elementor-fit-aspect-ratio elementor-open-inline">
                                      <iframe className="elementor-video-iframe" allowFullScreen title="vimeo Video Player" src="https://player.vimeo.com/video/805283120?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1&h=abbaf57cf4#t=" />				<div className="elementor-custom-embed-image-overlay" style={{backgroundImage: 'url(https://inboxmailers.com/wp-content/uploads/2021/01/StartScreen-Final.jpg)'}}>
                                        <div className="elementor-custom-embed-play" role="button" aria-label="Play Video" tabIndex={0}>
                                          <i aria-hidden="true" className="eicon-play" />							<span className="elementor-screen-only">Play Video</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </header>
            <div className="menu_mobile_overlay" />
            <div className="menu_mobile menu_mobile_narrow scheme_dark">
              <div className="menu_mobile_inner">
                <div className="mobile_menu_top_wrap">
                  <a className="menu_mobile_close theme_button_close"><span className="theme_button_close_icon" /></a>
                  <a className="sc_layouts_logo" href="https://inboxmailers.com/">
                    <img src="//inboxmailers.wpengine.com/wp-content/uploads/2021/01/Logo-Full-Long.png" srcSet="//inboxmailers.wpengine.com/wp-content/uploads/2021/01/Logo-Full-Long.png 2x" alt="" />	</a>
                </div>
                <nav className="menu_mobile_nav_area" itemScope><ul id="menu_mobile" className=" menu_mobile_nav"><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3897"><a href="https://inboxmailers.com/faq/"><span>FAQ</span></a></li><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4131"><a href="https://inboxmailers.com/our-solution/"><span>The Strategy</span></a></li><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3899"><a href="https://inboxmailers.com/app-integrations/"><span>Integrations</span></a></li><li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3900"><a href="https://inboxmailers.com/case-studies/"><span>Case Studies</span></a></li></ul></nav>	</div>
            </div>
            <div className="page_content_wrap">
              <div className="content_wrap">
                <div className="content">
                  <div data-elementor-type="wp-page" data-elementor-id={2065} data-post-id={2065} data-obj-id={2065} className="elementor elementor-2065 dce-elementor-post-2065">
                    <div className="elementor-inner">
                      <div className="elementor-section-wrap">
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-3a8d669 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3a8d669" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-a4b1d25 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="a4b1d25" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-c4929c1 sc_fly_static elementor-widget elementor-widget-spacer" data-id="c4929c1" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-38f5020 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="38f5020" data-element_type="widget" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-image">
                                          <img decoding="async" src="https://inboxmailers.com/wp-content/uploads/elementor/thumbs/icon-1-q1l3ryjx5lt5nlvmixo56suyw1dsxsh82k12wlkt0o.png" title="icon-1" alt="icon-1" />														</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-f6510ed sc_fly_static elementor-widget elementor-widget-spacer" data-id="f6510ed" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-5b159ac sc_fly_static elementor-widget elementor-widget-heading" data-id="5b159ac" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-large">Fix &amp; Increase Deliverability </h2>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-bc86b7b sc_fly_static elementor-widget elementor-widget-spacer" data-id="bc86b7b" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-0622ae7 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="0622ae7" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><u>Drastically</u> improve your deliverability, inboxing, and reputation by giving the ISPs and ESPs exactly what they want, higher open rates!</p><p>Use this strategy to warm up domains, IPs and grow you mail volume!</p>					</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-603385d sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="603385d" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-6275b72 sc_fly_static elementor-widget elementor-widget-spacer" data-id="6275b72" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-94d03ff dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="94d03ff" data-element_type="widget" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-image">
                                          <img decoding="async" src="https://inboxmailers.com/wp-content/uploads/elementor/thumbs/icon-2-q1l3rxm2yrrvbzwzof9imb3ianifq3dhqfdlfbm76w.png" title="icon-2" alt="icon-2" />														</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-c88938a sc_fly_static elementor-widget elementor-widget-spacer" data-id="c88938a" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-4b33ef3 sc_fly_static elementor-widget elementor-widget-heading" data-id="4b33ef3" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-large">Get 50% - 70%+ Open Rates</h2>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-379873e sc_fly_static elementor-widget elementor-widget-spacer" data-id="379873e" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-89d83de sc_fly_static elementor-widget elementor-widget-text-editor" data-id="89d83de" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p>Sending while subscribers are in their inbox increases open rates by 3x – 5x. The behavior of subscribers receiving emails at this time makes the timing of your send, <u>everything</u>!</p><p><strong>More Opens, Clicks, &amp; Revenue!</strong></p>					</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-4c1d8e8 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="4c1d8e8" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-eac87b8 sc_fly_static elementor-widget elementor-widget-spacer" data-id="eac87b8" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-2221567 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id={2221567} data-element_type="widget" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-image">
                                          <img decoding="async" src="https://inboxmailers.com/wp-content/uploads/elementor/thumbs/icon-3-q1l3sk67ismr2n080p0ka5ekjwf8utv1tj18xyor1k.png" title="icon-3" alt="icon-3" />														</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-ee03cb2 sc_fly_static elementor-widget elementor-widget-spacer" data-id="ee03cb2" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-4ef881b sc_fly_static elementor-widget elementor-widget-heading" data-id="4ef881b" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-large">ReEngage Your Dead Lists</h2>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-23630d9 sc_fly_static elementor-widget elementor-widget-spacer" data-id="23630d9" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-b191086 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="b191086" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p>Upload your dead list, a re-engagement email is automatically sent the next time your dead subscribers visit their inbox! This strategy generates a 50%+ open rate<strong> from your dead subscribers</strong>, getting them re-engaged once again!</p>					</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-d9c962e sc_layouts_hide_on_mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="d9c962e" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-43e0189 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="43e0189" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-91cc7b5 sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile sc_fly_static elementor-widget elementor-widget-spacer" data-id="91cc7b5" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-15e0516 elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="15e0516" data-element_type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;,&quot;shape_divider_top&quot;:&quot;waves&quot;,&quot;shape_divider_bottom&quot;:&quot;wave-brush&quot;}">
                          <div className="elementor-shape elementor-shape-top" data-negative="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                              <path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
                            </svg>		</div>
                          <div className="elementor-shape elementor-shape-bottom" data-negative="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                              <path className="elementor-shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z" />
                              <path className="elementor-shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z" />
                              <path className="elementor-shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z" />
                              <path className="elementor-shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z" />
                              <path className="elementor-shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z" />
                              <path className="elementor-shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z" />
                              <path className="elementor-shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z" />
                              <path className="elementor-shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z" />
                              <path className="elementor-shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z" />
                            </svg>		</div>
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-f5dceb1 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="f5dceb1" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-340c841 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="340c841" data-element_type="widget" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-image">
                                          <img decoding="async" src="https://inboxmailers.com/wp-content/uploads/2023/02/how-you-can-grow-your-email-marketing-roi.png" title="how you can grow your email marketing roi" alt="how you can grow your email marketing roi" />														</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-18887df sc_inner_width_1_2 sc-tablet_inner_width_1_1 sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="18887df" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-0834857 sc_fly_static elementor-widget elementor-widget-spacer">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7bfa6df sc_fly_static elementor-widget elementor-widget-heading" data-id="7bfa6df" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-xl">Timing is Everything</h2>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-647a0cb sc_fly_static elementor-widget elementor-widget-spacer" data-id="647a0cb" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-aefa9b4 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="aefa9b4" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>We have created the technology and network to recognize when <u>your subscribers</u> are in their inbox reading emails. </span></p><p>Delivering this ‘triggered’ email from your ESP at the time your subscribers are in their inbox has been proven over billions of email tests to consistently generate 50% – 70% Open Rates each and every time! </p><ul><li aria-level={1}><strong>Increase</strong> your Open Rates</li><li aria-level={1}><strong>Increase</strong> your Click Volume</li><li aria-level={1}><strong>Increase</strong> your Revenue per Send</li><li aria-level={1}><strong>Increase</strong> your Deliverability Rates</li><li aria-level={1}><strong>Increase</strong> your Inboxing Rates</li><li aria-level={1}><strong>Increase</strong> your Domain Reputation</li><li aria-level={1}><strong>Increase</strong> IP Health &amp; Reputation</li><li><strong>Integrates </strong>with your ESP seamlessly</li></ul>					</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-8b0e27f sc_fly_static elementor-widget elementor-widget-spacer" data-id="8b0e27f" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-6005e86 elementor-button-info elementor-align-center sc_fly_static elementor-widget elementor-widget-button" data-id="6005e86" data-element_type="widget" data-widget_type="button.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-button-wrapper">
                                          <a href="https://inboxmailers.com/pricing/" className="elementor-button-link elementor-button elementor-size-xl" role="button">
                                            <span className="elementor-button-content-wrapper">
                                              <span className="elementor-button-text">START NOW!</span>
                                            </span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-955e6c3 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="955e6c3" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-e305f0e sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="e305f0e" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-3dfc6f8 sc_fly_static elementor-widget elementor-widget-spacer" data-id="3dfc6f8" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-b5d7a2e elementor-section-stretched elementor-section-content-middle elementor-reverse-tablet elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="b5d7a2e" data-element_type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;,&quot;shape_divider_top&quot;:&quot;waves&quot;,&quot;shape_divider_bottom&quot;:&quot;wave-brush&quot;}">
                          <div className="elementor-shape elementor-shape-top" data-negative="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                              <path className="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
	c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
	c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
                            </svg>		</div>
                          <div className="elementor-shape elementor-shape-bottom" data-negative="false">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                              <path className="elementor-shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z" />
                              <path className="elementor-shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z" />
                              <path className="elementor-shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z" />
                              <path className="elementor-shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z" />
                              <path className="elementor-shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z" />
                              <path className="elementor-shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z" />
                              <path className="elementor-shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z" />
                              <path className="elementor-shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z" />
                              <path className="elementor-shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z" />
                            </svg>		</div>
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-8364bdb sc_inner_width_1_1 sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="8364bdb" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-696c727 sc_fly_static elementor-widget elementor-widget-spacer" data-id="696c727" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-0134e56 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="0134e56" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}><strong>We are email marketing pioneers and veterans</strong> who created Inbox Mailers after using the technology for ourselves and our clients. Inbox Mailers was Created out of necessity and demand from the market for the technology and network to enable all businesses who use email marketing the opportunity to use this patent-pending technology.</span></p><p><strong>We know the power of the technology behind the platform, we and our clients, partners, and marketers use it and live by it</strong>. We know the complexity of Email Marketing, Deliverability, Inboxing, Segmentation, IP Address Management and Heath, Domain Reputation, Open Rates, Engagement Rates, Earnings per Click, and Send and this technology puts emailing on steroids! </p><p><strong>Try the platform</strong> and instantly start seeing the results of sending when your subscribers are in their inbox, the results are clearly seen in your own ESP. <br /><br />This strategy will change the way you email and will produce an instant return, sign up below and see it work for yourself!</p>					</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-ac8198d sc_fly_static elementor-widget elementor-widget-spacer" data-id="ac8198d" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-f2611ab elementor-button-info elementor-align-center sc_fly_static elementor-widget elementor-widget-button" data-id="f2611ab" data-element_type="widget" data-widget_type="button.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-button-wrapper">
                                          <a href="https://inboxmailers.com/pricing/" className="elementor-button-link elementor-button elementor-size-xl" role="button">
                                            <span className="elementor-button-content-wrapper">
                                              <span className="elementor-button-text">START NOW!</span>
                                            </span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-211156b sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="211156b" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-bf5ce2a dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="bf5ce2a" data-element_type="widget" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-image">
                                          <img decoding="async" src="https://inboxmailers.com/wp-content/uploads/elementor/thumbs/who-we-are-q1l3s70lqj875qt4gw2mn4riuh9tejcy8y9spv1c7q.png" title="who we are" alt="who we are" />														</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-ad81283 sc_layouts_hide_on_mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="ad81283" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6cc6d54 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="6cc6d54" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-163cd9a sc_fly_static elementor-widget elementor-widget-spacer" data-id="163cd9a" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7f4c7e0 sc_fly_static elementor-widget elementor-widget-spacer" data-id="7f4c7e0" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-8ed7c4a elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="8ed7c4a" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-7bee83a sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="7bee83a" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-fb88100 sc_fly_static elementor-widget elementor-widget-spacer" data-id="fb88100" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-99d63bb elementor-view-default sc_fly_static elementor-widget elementor-widget-icon" data-id="99d63bb" data-element_type="widget" data-widget_type="icon.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-icon-wrapper">
                                          <div className="elementor-icon">
                                            <i aria-hidden="true" className="far fa-list-alt" />			</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-9e8a2a5 sc_fly_static elementor-widget elementor-widget-heading" data-id="9e8a2a5" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-heading-title elementor-size-medium">Flexibility &amp; Controls</div>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-4380f01 sc_fly_static elementor-widget elementor-widget-spacer" data-id="4380f01" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-cc275bd sc_fly_static elementor-widget elementor-widget-text-editor" data-id="cc275bd" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>Use many different triggered emails (offers/promotions) and control how many times your subscriber <br />gets each triggered email.</span></p>					</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div data-dce-background-color="#2F2F2F" className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-70d8e4e sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="70d8e4e" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-457e5f2 sc_fly_static elementor-widget elementor-widget-spacer" data-id="457e5f2" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-aabfdb3 elementor-view-default sc_fly_static elementor-widget elementor-widget-icon" data-id="aabfdb3" data-element_type="widget" data-widget_type="icon.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-icon-wrapper">
                                          <div className="elementor-icon">
                                            <i aria-hidden="true" className="fas fa-globe" />			</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-268869f sc_fly_static elementor-widget elementor-widget-heading" data-id="268869f" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-heading-title elementor-size-medium">Global network
                                        </div>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-dc1f56a sc_fly_static elementor-widget elementor-widget-spacer" data-id="dc1f56a" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-8419b8f sc_fly_static elementor-widget elementor-widget-text-editor" data-id="8419b8f" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>Exponentially create more opportunities to fire triggered emails when your subscribers are in their inbox whether they open your emails… or not! (in other words, they open another client’s email and your triggered email gets sent!)</span></p>					</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-4dce1f5 sc_fly_static elementor-widget elementor-widget-spacer" data-id="4dce1f5" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-299e1e1 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="299e1e1" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-6bd4b0e sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="6bd4b0e" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-a46b73c sc_fly_static elementor-widget elementor-widget-spacer" data-id="a46b73c" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-d88a22d elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="d88a22d" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div data-dce-background-color="#2F2F2F" className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-864d96a sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="864d96a" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-677eef5 sc_fly_static elementor-widget elementor-widget-spacer" data-id="677eef5" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-2990e56 elementor-view-default sc_fly_static elementor-widget elementor-widget-icon" data-id="2990e56" data-element_type="widget" data-widget_type="icon.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-icon-wrapper">
                                          <div className="elementor-icon">
                                            <i aria-hidden="true" className="far fa-object-ungroup" />			</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-8412c45 sc_fly_static elementor-widget elementor-widget-heading" data-id="8412c45" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-heading-title elementor-size-medium">White Glove Personalized Setup Included
                                        </div>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-15faa77 sc_fly_static elementor-widget elementor-widget-spacer" data-id="15faa77" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-a1617a6 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="a1617a6" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>Don’t get overwhelmed. Each new customer gets their own personalized ‘</span><b>White Glove</b><span style={{fontWeight: 400}}>‘ </span><b>setup session </b><br />to start and connect to your ESP</p>					</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-4ba25e1 sc_fly_static elementor-widget elementor-widget-spacer" data-id="4ba25e1" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-a84c343 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="a84c343" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-e741af0 sc_fly_static elementor-widget elementor-widget-spacer" data-id="e741af0" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-c4a5179 elementor-view-default sc_fly_static elementor-widget elementor-widget-icon" data-id="c4a5179" data-element_type="widget" data-widget_type="icon.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-icon-wrapper">
                                          <div className="elementor-icon">
                                            <i aria-hidden="true" className="fab fa-rocketchat" />			</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-1c3d20e sc_fly_static elementor-widget elementor-widget-heading" data-id="1c3d20e" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-heading-title elementor-size-medium">Prebuilt Integrations &amp; Zapier</div>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-41d85b3 sc_fly_static elementor-widget elementor-widget-spacer" data-id="41d85b3" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-ca7ca72 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="ca7ca72" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>Use our prebuilt integrations with many ESPs, CRMs, and mailing platforms or use the thousands of connections through Zapier to fire your triggered email.</span></p>					</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-53d6fba elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="53d6fba" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-166340f sc_layouts_hide_on_tablet sc_layouts_hide_on_mobile sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="166340f" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-7853087 sc_fly_static elementor-widget elementor-widget-spacer" data-id={7853087} data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-0c8ff74 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="0c8ff74" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-a6df906 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="a6df906" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-a1d5539 sc_fly_static elementor-widget elementor-widget-spacer" data-id="a1d5539" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-a3d3429 elementor-view-default sc_fly_static elementor-widget elementor-widget-icon" data-id="a3d3429" data-element_type="widget" data-widget_type="icon.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-icon-wrapper">
                                          <div className="elementor-icon">
                                            <i aria-hidden="true" className="far fa-dizzy" />			</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-5b41ccb sc_fly_static elementor-widget elementor-widget-heading" data-id="5b41ccb" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-heading-title elementor-size-medium">Spam Checker
                                        </div>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-ad51a0a sc_fly_static elementor-widget elementor-widget-spacer" data-id="ad51a0a" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-f00ea00 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="f00ea00" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>Stay out of the spam folder, triggered emails get much higher engagement and that’s what ISPs want and love! Quickly improve your reputation, inboxing, and deliverability across the board and have triggered emails lift all your sends.</span></p>					</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div data-dce-background-color="#2F2F2F" className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-31c152d sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="31c152d" data-element_type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-6e0cb51 sc_fly_static elementor-widget elementor-widget-spacer" data-id="6e0cb51" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-cead7c1 elementor-view-default sc_fly_static elementor-widget elementor-widget-icon" data-id="cead7c1" data-element_type="widget" data-widget_type="icon.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-icon-wrapper">
                                          <div className="elementor-icon">
                                            <i aria-hidden="true" className="far fa-chart-bar" />			</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-b6517c9 sc_fly_static elementor-widget elementor-widget-heading" data-id="b6517c9" data-element_type="widget" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-heading-title elementor-size-medium">Open Rates</div>		</div>
                                    </div>
                                    <div className="elementor-element elementor-element-c0c9677 sc_fly_static elementor-widget elementor-widget-spacer" data-id="c0c9677" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-b7775d8 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="b7775d8" data-element_type="widget" data-widget_type="text-editor.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-text-editor elementor-clearfix">
                                          <p><span style={{fontWeight: 400}}>ISPs and ESPs want a higher engagement ratio to avoid being marked as spam. Increase your open rates by 3x to 5x and you will quickly realize being a inbox mailer lifts the performance of all your email marketing efforts!</span></p>					</div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-6c200dd sc_fly_static elementor-widget elementor-widget-spacer" data-id="6c200dd" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-c36b775 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="c36b775" data-element_type="section">
                          <div className="elementor-container elementor-column-gap-extended">
                            <div className="elementor-row">
                              <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-28f6513 sc_layouts_hide_on_mobile sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="28f6513" data-element_type="column">
                                <div className="elementor-column-wrap elementor-element-populated">
                                  <div className="elementor-widget-wrap">
                                    <div className="elementor-element elementor-element-7d81e72 sc_fly_static elementor-widget elementor-widget-spacer" data-id="7d81e72" data-element_type="widget" data-widget_type="spacer.default">
                                      <div className="elementor-widget-container">
                                        <div className="elementor-spacer">
                                          <div className="elementor-spacer-inner" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>{/* </.content> */}
              </div>{/* </.content_wrap> */}
            </div>{/* </.page_content_wrap> */}
            <footer className="footer_wrap footer_custom footer_custom_1880 footer_custom_footer-for-all-pages												">
              <style id="elementor-post-1880" dangerouslySetInnerHTML={{__html: ".elementor-1880 .elementor-element.elementor-element-8fb9b8e:not(.elementor-motion-effects-element-type-background), .elementor-1880 .elementor-element.elementor-element-8fb9b8e > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#000000;}.elementor-1880 .elementor-element.elementor-element-8fb9b8e{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;margin-top:0px;margin-bottom:0px;padding:0px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-8fb9b8e > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-1880 .elementor-element.elementor-element-d3b78b7 .elementor-spacer-inner{--spacer-size:16px;}.elementor-1880 .elementor-element.elementor-element-3c5c313 .elementor-spacer-inner{--spacer-size:10px;}.elementor-1880 .elementor-element.elementor-element-7c4e4b6 .elementor-spacer-inner{--spacer-size:25px;}.elementor-1880 .elementor-element.elementor-element-7b34099{text-align:center;}.elementor-1880 .elementor-element.elementor-element-00f0d46 .elementor-spacer-inner{--spacer-size:31px;}.elementor-1880 .elementor-element.elementor-element-79d7cd3 .elementor-spacer-inner{--spacer-size:10px;}.elementor-1880 .elementor-element.elementor-element-a7d59bd .elementor-spacer-inner{--spacer-size:38px;}.elementor-1880 .elementor-element.elementor-element-46cf20b .elementor-spacer-inner{--spacer-size:10px;}.elementor-1880 .elementor-element.elementor-element-9a68d8c .elementor-spacer-inner{--spacer-size:38px;}.elementor-1880 .elementor-element.elementor-element-6f076ee{border-style:solid;border-color:#000000;transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;}.elementor-1880 .elementor-element.elementor-element-6f076ee > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-1880 .elementor-element.elementor-element-69e5821 > .elementor-element-populated{color:#000000;}.elementor-1880 .elementor-element.elementor-element-69e5821 .elementor-element-populated a{color:#000000;}.elementor-1880 .elementor-element.elementor-element-69e5821 .elementor-element-populated a:hover{color:#FF0000;}.elementor-1880 .elementor-element.elementor-element-ac7398b > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap{align-content:flex-start;align-items:flex-start;}.elementor-1880 .elementor-element.elementor-element-ac7398b:not(.elementor-motion-effects-element-type-background), .elementor-1880 .elementor-element.elementor-element-ac7398b > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-ac7398b{transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;color:#FFFFFF;margin-top:9px;margin-bottom:9px;padding:15px 0px 10px 0px;}.elementor-1880 .elementor-element.elementor-element-ac7398b > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-1880 .elementor-element.elementor-element-ac7398b .elementor-heading-title{color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-ac7398b a{color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-ac7398b a:hover{color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-ce573dc{color:#000000;}.elementor-1880 .elementor-element.elementor-element-1cf5970 .elementor-spacer-inner{--spacer-size:17px;}.elementor-1880 .elementor-element.elementor-element-2d9c322 .elementor-heading-title{color:#000000;}.elementor-1880 .elementor-element.elementor-element-2d9c322 > .elementor-widget-container{margin:0px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-c61ae1a .elementor-spacer-inner{--spacer-size:2px;}.elementor-1880 .elementor-element.elementor-element-38dae18{color:#000000;}.elementor-1880 .elementor-element.elementor-element-41c91aa .elementor-heading-title{color:#000000;}.elementor-1880 .elementor-element.elementor-element-41c91aa > .elementor-widget-container{margin:0px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-71b3b62 .elementor-spacer-inner{--spacer-size:2px;}.elementor-1880 .elementor-element.elementor-element-24da004{color:#000000;}.elementor-1880 .elementor-element.elementor-element-d2565ae .elementor-heading-title{color:#000000;}.elementor-1880 .elementor-element.elementor-element-47f7d69 .elementor-spacer-inner{--spacer-size:2px;}.elementor-1880 .elementor-element.elementor-element-61ed6bf{color:#000000;}.elementor-1880 .elementor-element.elementor-element-a5d771e .elementor-heading-title{color:#000000;}.elementor-1880 .elementor-element.elementor-element-fc09f21 .elementor-spacer-inner{--spacer-size:2px;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-c4da4bd.elementor-social-icon{background-color:#000000;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-c4da4bd.elementor-social-icon i{color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-c4da4bd.elementor-social-icon svg{fill:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-9828280.elementor-social-icon{background-color:#000000;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-9828280.elementor-social-icon i{color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-9828280.elementor-social-icon svg{fill:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-a3bba1f.elementor-social-icon{background-color:#000000;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-a3bba1f.elementor-social-icon i{color:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-repeater-item-a3bba1f.elementor-social-icon svg{fill:#FFFFFF;}.elementor-1880 .elementor-element.elementor-element-5953c55{--grid-template-columns:repeat(1, auto);--icon-size:25px;--grid-column-gap:10px;--grid-row-gap:5px;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-widget-container{text-align:left;}.elementor-1880 .elementor-element.elementor-element-5953c55 .elementor-social-icon{--icon-padding:0.3em;}.elementor-1880 .elementor-element.elementor-element-5953c55 > .elementor-widget-container{margin:5px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-2fe1044 > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1880 .elementor-element.elementor-element-2fe1044{border-style:solid;border-width:1px 0px 0px 0px;border-color:#edeaf4;transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;padding:0px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-2fe1044 > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-bc-flex-widget .elementor-1880 .elementor-element.elementor-element-20de82b.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1880 .elementor-element.elementor-element-20de82b.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1880 .elementor-element.elementor-element-20de82b.elementor-column > .elementor-column-wrap > .elementor-widget-wrap{justify-content:center;}.elementor-bc-flex-widget .elementor-1880 .elementor-element.elementor-element-36d650d.elementor-column .elementor-column-wrap{align-items:center;}.elementor-1880 .elementor-element.elementor-element-36d650d.elementor-column.elementor-element[data-element_type=\"column\"] > .elementor-column-wrap.elementor-element-populated > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1880 .elementor-element.elementor-element-36d650d.elementor-column > .elementor-column-wrap > .elementor-widget-wrap{justify-content:center;}.elementor-1880 .elementor-element.elementor-element-36d650d > .elementor-element-populated.elementor-column-wrap{padding:0px 0px 0px 50px;}.elementor-1880 .elementor-element.elementor-element-73480e4 > .elementor-widget-container{padding:0px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-e047fd1{text-align:center;}.elementor-1880 .elementor-element.elementor-element-28104b0{text-align:center;}.elementor-1880 .elementor-element.elementor-element-92d96ca > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap{align-content:center;align-items:center;}.elementor-1880 .elementor-element.elementor-element-92d96ca{border-style:solid;border-width:1px 0px 0px 0px;border-color:#edeaf4;transition:background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;padding:22px 0px 10px 0px;}.elementor-1880 .elementor-element.elementor-element-92d96ca > .elementor-background-overlay{transition:background 0.3s, border-radius 0.3s, opacity 0.3s;}.elementor-1880 .elementor-element.elementor-element-4b1ebcb{--e-icon-list-icon-size:14px;}.elementor-1880 .elementor-element.elementor-element-45eba7a .elementor-spacer-inner{--spacer-size:50px;}:root{--page-title-display:none;}body.elementor-page-1880:not(.elementor-motion-effects-element-type-background), body.elementor-page-1880 > .elementor-motion-effects-container > .elementor-motion-effects-layer{background-color:#FFFFFF;}@media(min-width:768px){.elementor-1880 .elementor-element.elementor-element-20de82b{width:33.997%;}.elementor-1880 .elementor-element.elementor-element-36d650d{width:20.707%;}.elementor-1880 .elementor-element.elementor-element-1ba9f01{width:21.572%;}.elementor-1880 .elementor-element.elementor-element-4f389b6{width:23.638%;}}@media(max-width:1024px){.elementor-1880 .elementor-element.elementor-element-ac7398b{padding:32px 0px 40px 0px;}.elementor-1880 .elementor-element.elementor-element-2fe1044{padding:10px 0px 10px 0px;}.elementor-1880 .elementor-element.elementor-element-92d96ca{padding:10px 0px 10px 0px;}}@media(max-width:767px){.elementor-1880 .elementor-element.elementor-element-6f076ee{border-width:5px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-6f076ee, .elementor-1880 .elementor-element.elementor-element-6f076ee > .elementor-background-overlay{border-radius:0px 0px 0px 0px;}.elementor-1880 .elementor-element.elementor-element-73e41bb > .elementor-element-populated{margin:18px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-1880 .elementor-element.elementor-element-1cf5970 .elementor-spacer-inner{--spacer-size:10px;}.elementor-1880 .elementor-element.elementor-element-26355fe > .elementor-element-populated{margin:6px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-1880 .elementor-element.elementor-element-bbec2b2 > .elementor-element-populated{margin:6px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-1880 .elementor-element.elementor-element-876a493 > .elementor-element-populated{margin:6px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-1880 .elementor-element.elementor-element-56aaa63 > .elementor-element-populated{margin:6px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}.elementor-1880 .elementor-element.elementor-element-36d650d > .elementor-element-populated{margin:6px 0px 0px 0px;--e-column-margin-right:0px;--e-column-margin-left:0px;}}@media(max-width:1024px) and (min-width:768px){.elementor-1880 .elementor-element.elementor-element-73e41bb{width:50%;}.elementor-1880 .elementor-element.elementor-element-26355fe{width:50%;}.elementor-1880 .elementor-element.elementor-element-bbec2b2{width:50%;}.elementor-1880 .elementor-element.elementor-element-876a493{width:50%;}.elementor-1880 .elementor-element.elementor-element-36d650d{width:50%;}}" }} />		<div data-elementor-type="wp-post" data-elementor-id={1880} data-post-id={2065} data-obj-id={2065} className="elementor elementor-1880 dce-elementor-post-2065">
                <div className="elementor-inner">
                  <div className="elementor-section-wrap">
                    <section data-dce-background-color="#000000" className="elementor-section elementor-top-section elementor-element elementor-element-8fb9b8e sc_layouts_hide_on_mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="8fb9b8e" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-c9da0c0 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="c9da0c0" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-d3b78b7 sc_fly_static elementor-widget elementor-widget-spacer" data-id="d3b78b7" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-adf2d5b dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="adf2d5b" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <img width={1024} height={274} src="https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo-1024x274.png" className="attachment-large size-large" alt="" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo-1024x274.png 1024w, https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo-300x80.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo-768x206.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo-370x99.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo-760x204.png 760w, https://inboxmailers.com/wp-content/uploads/2021/01/white_mc_horizontal_logo.png 1280w" sizes="(max-width: 1024px) 100vw, 1024px" />														</div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-3c5c313 sc_fly_static elementor-widget elementor-widget-spacer" data-id="3c5c313" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-65e3245 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="65e3245" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-7c4e4b6 sc_fly_static elementor-widget elementor-widget-spacer" data-id="7c4e4b6" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-7b34099 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="7b34099" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <img width={600} height={135} src="https://inboxmailers.com/wp-content/uploads/2021/01/constant-contact-logo-white.png" className="attachment-large size-large" alt="" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/constant-contact-logo-white.png 600w, https://inboxmailers.com/wp-content/uploads/2021/01/constant-contact-logo-white-300x68.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/constant-contact-logo-white-370x83.png 370w" sizes="(max-width: 600px) 100vw, 600px" />														</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-aeeef78 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="aeeef78" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-00f0d46 sc_fly_static elementor-widget elementor-widget-spacer" data-id="00f0d46" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-d27a0de dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="d27a0de" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <img width={1024} height={104} src="https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-1024x104.png" className="attachment-large size-large" alt="" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-1024x104.png 1024w, https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-300x31.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-768x78.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-1536x157.png 1536w, https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-2048x209.png 2048w, https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-370x38.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/ac_logo-white-trans-760x78.png 760w" sizes="(max-width: 1024px) 100vw, 1024px" />														</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-798961c sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="798961c" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-79d7cd3 sc_fly_static elementor-widget elementor-widget-spacer" data-id="79d7cd3" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-302e806 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="302e806" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <img width={165} height={60} src="https://inboxmailers.com/wp-content/uploads/2021/01/SendGrid-logo-white-1.png" className="attachment-large size-large" alt="" loading="lazy" />														</div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-a7d59bd sc_fly_static elementor-widget elementor-widget-spacer" data-id="a7d59bd" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-43c24f7 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="43c24f7" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <div className="sc_layouts_item elementor-element elementor-element-46cf20b sc_fly_static elementor-widget elementor-widget-spacer" data-id="46cf20b" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-bdddc77 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="bdddc77" data-element_type="widget" data-widget_type="image.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-image">
                                      <img width={1000} height={343} src="https://inboxmailers.com/wp-content/uploads/2021/01/png-zapier.png" className="attachment-large size-large" alt="" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/png-zapier.png 1000w, https://inboxmailers.com/wp-content/uploads/2021/01/png-zapier-300x103.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/png-zapier-768x263.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/png-zapier-370x127.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/png-zapier-760x261.png 760w" sizes="(max-width: 1000px) 100vw, 1000px" />														</div>
                                  </div>
                                </div>
                                <div className="sc_layouts_item elementor-element elementor-element-9a68d8c sc_fly_static elementor-widget elementor-widget-spacer" data-id="9a68d8c" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-spacer">
                                      <div className="elementor-spacer-inner" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <footer className="elementor-section elementor-top-section elementor-element elementor-element-6f076ee elementor-section-stretched scheme_default elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="6f076ee" data-element_type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
                      <div className="elementor-container elementor-column-gap-extended">
                        <div className="elementor-row">
                          <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-69e5821 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="69e5821" data-element_type="column">
                            <div className="elementor-column-wrap elementor-element-populated">
                              <div className="elementor-widget-wrap">
                                <footer data-dce-background-color="#FFFFFF" className="elementor-section elementor-inner-section elementor-element elementor-element-ac7398b elementor-section-content-top elementor-section-full_width elementor-section-height-default elementor-section-height-default" data-id="ac7398b" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                  <div className="elementor-container elementor-column-gap-extended">
                                    <div className="elementor-row">
                                      <div className="elementor-column elementor-col-20 elementor-inner-column elementor-element elementor-element-73e41bb sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="73e41bb" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-5bb4637 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="5bb4637" data-element_type="widget" data-widget_type="image.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-image">
                                                  <a href="/">
                                                    <img width={1024} height={169} src="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png" className="attachment-large size-large" alt="Inbox Mailers" loading="lazy" srcSet="https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1024x169.png 1024w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-300x50.png 300w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-768x127.png 768w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-1536x254.png 1536w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-370x61.png 370w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long-760x126.png 760w, https://inboxmailers.com/wp-content/uploads/2021/01/Logo-Full-Long.png 1767w" sizes="(max-width: 1024px) 100vw, 1024px" />								</a>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-ce573dc link_block sc_fly_static elementor-widget elementor-widget-text-editor" data-id="ce573dc" data-element_type="widget" data-widget_type="text-editor.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-text-editor elementor-clearfix">
                                                  <p>20 North Orange Ave.<br />Floor 11<br />Orlando, Florida 32801</p><p><a href="tel:407-606-6245"><strong> (407) 606-6245</strong></a></p>					</div>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-1cf5970 sc_fly_static elementor-widget elementor-widget-spacer" data-id="1cf5970" data-element_type="widget" data-widget_type="spacer.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-spacer">
                                                  <div className="elementor-spacer-inner" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-20 elementor-inner-column elementor-element elementor-element-26355fe sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="26355fe" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-2d9c322 sc_fly_static elementor-widget elementor-widget-heading" data-id="2d9c322" data-element_type="widget" data-widget_type="heading.default">
                                              <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">Company</h4>		</div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-c61ae1a sc_fly_static elementor-widget elementor-widget-spacer" data-id="c61ae1a" data-element_type="widget" data-widget_type="spacer.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-spacer">
                                                  <div className="elementor-spacer-inner" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-38dae18 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="38dae18" data-element_type="widget" data-widget_type="text-editor.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-text-editor elementor-clearfix">
                                                  <p><a href="https://inboxmailers.com/about/">About Us</a><br /><a href="https://inboxmailers.com/faq/">FAQ</a><br /><a href="https://inboxmailers.com/publishers/">Partner With Us</a><br /><a href="https://inboxmailers.com/publishers/">Affiliate Program</a><br /><a href="https://www.inboxmailers.com/privacy-policy/">Customer Privacy</a></p>					</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-20 elementor-inner-column elementor-element elementor-element-bbec2b2 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="bbec2b2" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-41c91aa sc_fly_static elementor-widget elementor-widget-heading" data-id="41c91aa" data-element_type="widget" data-widget_type="heading.default">
                                              <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">Solution</h4>		</div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-71b3b62 sc_fly_static elementor-widget elementor-widget-spacer" data-id="71b3b62" data-element_type="widget" data-widget_type="spacer.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-spacer">
                                                  <div className="elementor-spacer-inner" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-24da004 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="24da004" data-element_type="widget" data-widget_type="text-editor.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-text-editor elementor-clearfix">
                                                  <p><a href="https://inboxmailers.com/case-studies/">Case Studies</a><br /><a href="https://inboxmailers.com/integrations/">Integrations</a><br /><a href="https://inboxmailers.com/our-solution/">Our Solution</a><br /><a href="https://inboxmailers.com/non-profit-program/">Non-Profits</a><br /><a href="https://inboxmailers.com/contact-us-pricing/">Pricing</a></p>					</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-20 elementor-inner-column elementor-element elementor-element-876a493 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="876a493" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-d2565ae sc_fly_static elementor-widget elementor-widget-heading" data-id="d2565ae" data-element_type="widget" data-widget_type="heading.default">
                                              <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">Resources</h4>		</div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-47f7d69 sc_fly_static elementor-widget elementor-widget-spacer" data-id="47f7d69" data-element_type="widget" data-widget_type="spacer.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-spacer">
                                                  <div className="elementor-spacer-inner" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-61ed6bf sc_fly_static elementor-widget elementor-widget-text-editor" data-id="61ed6bf" data-element_type="widget" data-widget_type="text-editor.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-text-editor elementor-clearfix">
                                                  <p><a href="/c/email-marketing-tips/">Email Tips</a><br /><a href="https://inboxmailers.com/use-cases/#enterprise-use-case-for-inbox-mailers">Enterprise Solution</a><br /><a href="https://inboxmailers.com/use-cases/#news-publishers-use-case-for-inbox-mailers">News Publications</a><br /><a href="https://inboxmailers.com/use-cases/#marketing-use-case-for-inbox-mailers">Marketing Teams</a><br /><a href="https://inboxmailers.com/use-cases/#ecommerce-use-case-for-inbox-mailers">eCommerce</a></p>					</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-20 elementor-inner-column elementor-element elementor-element-56aaa63 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="56aaa63" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-a5d771e sc_fly_static elementor-widget elementor-widget-heading" data-id="a5d771e" data-element_type="widget" data-widget_type="heading.default">
                                              <div className="elementor-widget-container">
                                                <h4 className="elementor-heading-title elementor-size-default">Follow Us</h4>		</div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-fc09f21 sc_fly_static elementor-widget elementor-widget-spacer" data-id="fc09f21" data-element_type="widget" data-widget_type="spacer.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-spacer">
                                                  <div className="elementor-spacer-inner" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-5953c55 elementor-shape-circle elementor-grid-1 e-grid-align-left sc_fly_static elementor-widget elementor-widget-social-icons" data-id="5953c55" data-element_type="widget" data-widget_type="social-icons.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-social-icons-wrapper elementor-grid">
                                                  <span className="elementor-grid-item">
                                                    <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-repeater-item-c4da4bd" href="https://www.facebook.com/inboxmailers" target="_blank">
                                                      <span className="elementor-screen-only">Facebook</span>
                                                      <i className="fab fa-facebook" />					</a>
                                                  </span>
                                                  <span className="elementor-grid-item">
                                                    <a className="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-repeater-item-9828280" href="https://www.linkedin.com/company/inboxmailers/" target="_blank">
                                                      <span className="elementor-screen-only">Linkedin</span>
                                                      <i className="fab fa-linkedin" />					</a>
                                                  </span>
                                                  <span className="elementor-grid-item">
                                                    <a className="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-a3bba1f" href="https://www.youtube.com/@inboxmailers" target="_blank">
                                                      <span className="elementor-screen-only">Youtube</span>
                                                      <i className="fab fa-youtube" />					</a>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </footer>
                                <section className="elementor-section elementor-inner-section elementor-element elementor-element-2fe1044 elementor-section-content-middle elementor-section-full_width elementor-section-height-default elementor-section-height-default" data-id="2fe1044" data-element_type="section">
                                  <div className="elementor-container elementor-column-gap-extended">
                                    <div className="elementor-row">
                                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-20de82b sc_content_align_left sc-mobile_content_align_center sc-mobile_layouts_column_align_center sc_layouts_column sc_inner_width_none sc_layouts_column_icons_position_left" data-id="20de82b" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-4a2e143 sc_fly_static elementor-widget elementor-widget-text-editor" data-id="4a2e143" data-element_type="widget" data-widget_type="text-editor.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-text-editor elementor-clearfix">
                                                  <p><strong>Fully Protected and Secured By:</strong></p>					</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-36d650d sc_inner_width_1_1 sc_content_align_center sc_layouts_column_icons_position_left" data-id="36d650d" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-73480e4 sc_fly_static elementor-widget elementor-widget-html" data-id="73480e4" data-element_type="widget" data-widget_type="html.default">
                                              <div className="elementor-widget-container">
                                                <div className="AuthorizeNetSeal"> </div>		</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-1ba9f01 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="1ba9f01" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-e047fd1 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="e047fd1" data-element_type="widget" data-widget_type="image.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-image">
                                                  <img src="https://inboxmailers.com/wp-content/uploads/elementor/thumbs/AWS_Simple_Icons_AWS_Cloud.svg-pxr7y0eqbt0zn6abh75y6nfaotjq1llh8fl5ij5k3k.png" title="AWS_Simple_Icons_AWS_Cloud.svg" alt="AWS_Simple_Icons_AWS_Cloud.svg" />														</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="elementor-column elementor-col-25 elementor-inner-column elementor-element elementor-element-4f389b6 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left" data-id="4f389b6" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-28104b0 dce_masking-none sc_fly_static elementor-widget elementor-widget-image" data-id="28104b0" data-element_type="widget" data-widget_type="image.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-image">
                                                  <img src="https://inboxmailers.com/wp-content/uploads/elementor/thumbs/shield-pxr7yl36i5taqlga4g3qpi7frapsqxvkn9xu2mawao.png" title="shield" alt="shield" />														</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <section className="elementor-section elementor-inner-section elementor-element elementor-element-92d96ca elementor-section-content-middle elementor-section-full_width elementor-section-height-default elementor-section-height-default" data-id="92d96ca" data-element_type="section">
                                  <div className="elementor-container elementor-column-gap-extended">
                                    <div className="elementor-row">
                                      <div className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-aeb59b9 sc_content_align_left sc-mobile_content_align_center sc-mobile_layouts_column_align_center sc_layouts_column sc_inner_width_none sc_layouts_column_icons_position_left" data-id="aeb59b9" data-element_type="column">
                                        <div className="elementor-column-wrap elementor-element-populated">
                                          <div className="elementor-widget-wrap">
                                            <div className="sc_layouts_item elementor-element elementor-element-4b1ebcb elementor-icon-list--layout-inline elementor-align-center elementor-list-item-link-full_width sc_fly_static elementor-widget elementor-widget-icon-list" data-id="4b1ebcb" data-element_type="widget" data-widget_type="icon-list.default">
                                              <div className="elementor-widget-container">
                                                <ul className="elementor-icon-list-items elementor-inline-items">
                                                  <li className="elementor-icon-list-item elementor-inline-item">
                                                    <a href="https://inboxmailers.com/privacy-policy/">
                                                      <span className="elementor-icon-list-text">Privacy Policy</span>
                                                    </a>
                                                  </li>
                                                  <li className="elementor-icon-list-item elementor-inline-item">
                                                    <a href="https://inboxmailers.com/terms-of-service/">
                                                      <span className="elementor-icon-list-text">Terms of Service</span>
                                                    </a>
                                                  </li>
                                                  <li className="elementor-icon-list-item elementor-inline-item">
                                                    <a href="https://inboxmailers.com/do-not-sell-my-personal-information/">
                                                      <span className="elementor-icon-list-text">CCPA DO NOT SELL MY INFO</span>
                                                    </a>
                                                  </li>
                                                  <li className="elementor-icon-list-item elementor-inline-item">
                                                    <a href="https://inboxmailers.com/database-opt-out/">
                                                      <span className="elementor-icon-list-text">Database OPT-OUT</span>
                                                    </a>
                                                  </li>
                                                  <li className="elementor-icon-list-item elementor-inline-item">
                                                    <span className="elementor-icon-list-text">© 2023 All rights reserved</span>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-f61ed6b sc_fly_static elementor-widget elementor-widget-html" data-id="f61ed6b" data-element_type="widget" data-widget_type="html.default">
                                              <div className="elementor-widget-container">
                                                {/* Smart Recognition */}
                                              </div>
                                            </div>
                                            <div className="sc_layouts_item elementor-element elementor-element-45eba7a sc_fly_static elementor-widget elementor-widget-spacer" data-id="45eba7a" data-element_type="widget" data-widget_type="spacer.default">
                                              <div className="elementor-widget-container">
                                                <div className="elementor-spacer">
                                                  <div className="elementor-spacer-inner" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </footer>{/* /.footer_wrap */}
          </div>{/* /.page_wrap */}
        </div>{/* /.body_wrap */}
        <link property="stylesheet" rel="stylesheet" id="e-animations-css" href="https://inboxmailers.com/wp-content/plugins/elementor/assets/lib/animations/animations.min.css?ver=3.6.6" type="text/css" media="all" />
        <link property="stylesheet" rel="stylesheet" id="google-fonts-2-css" href="https://fonts.googleapis.com/css?family=Montserrat%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&display=auto&ver=6.1.1" type="text/css" media="all" />
      </div>
        </>
    );
};
