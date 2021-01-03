export class PlanProperties {
    HOME_LINK = '/fad';

    FEDRAL_WCM1 = {
        'navigateTarget': 'modal',
        'navigateTo': 'federalEmployee',
        'content': ''
    };
    MEDICARE_WCM1 = {
        'navigateTarget': 'page',
        'navigateTo': 'medicare',
        'content': ''
    };

    WCM_CONTENT = {
        'planMessages': [
            {
                'contentId': 'MEDICARE_WCM1',
                'displayOption': 'page',
                'heading': '',
                'subHeading': '',
                'paragraphs': [{
                    'contents': [
                        {
                            'hasRichContent': 'true',
                            'content': `Our Medicare Supplement plans allow you to choose any doctor, hospital or other provider who accepts Medicare
              - without being limited to a network. To find providers who accept Medicare, use the `,
                            'url': {
                                'displatText': 'Participating Physician Directory',
                                'address': 'https://www.medicare.gov/physiciancompare/',
                                'externalSite': 'true',
                                'style': 'link'
                            }
                        },
                        {
                            'hasRichContent': 'true',
                            'content': ' at ',
                            'url': {
                                'displatText': 'Medicare.gov',
                                'address': 'https://www.medicare.gov/physiciancompare/',
                                'externalSite': 'true',
                                'style': 'link'
                            }
                        },
                        {
                            'hasRichContent': 'false',
                            'content': ', the official website for people with Medicare coverage.',
                            'url': {
                                'displatText': 'Medicare.gov',
                                'address': 'https://www.medicare.gov/physiciancompare/',
                                'externalSite': 'true',
                                'style': 'link'
                            }
                        }
                    ]
                },
                {
                    'contents': [{
                        'hasRichContent': 'true',
                        'content': '',
                        'url': {
                            'displatText': 'Start Over',
                            'address': '/fad',
                            'externalSite': 'false',
                            'style': 'link'
                        }
                    }
                    ]
                }]
            },
            {
                'contentId': 'WCM_mentalHealth',
                'displayOption': 'page',
                'heading': '',
                'subHeading': 'MENTAL HEALTH CAREGIVERS INFORMATION',
                'paragraphs': [{
                    'contents': [
                        {
                            'hasRichContent': 'false',
                            'content': `If your Evidence of Coverage or Certificate of Insurance states that mental health services are available through
              the Mental Health Services Administrator (MHSA) network, you can search for providers in the MHSA network.`,
                            'url': {
                                'displatText': '',
                                'address': '',
                                'style': ''
                            }
                        }
                    ]
                },
                {
                    'contents': [
                        {
                            'hasRichContent': 'true',
                            'content': '',
                            'url': {
                                'displatText': 'Visit the MHSA Network',
                                'address': 'https://www.magellanassist.com',
                                'externalSite': 'true',
                                'style': 'link'
                            }
                        }
                    ]
                },
                {
                    'contents': [{
                        'hasRichContent': 'true',
                        'content': '',
                        'url': {
                            'displatText': 'Start Over',
                            'address': '/fad',
                            'externalSite': 'false',
                            'style': 'link'
                        }
                    }
                    ]
                }
                ]
            },
            {
                'contentId': 'federalEmployee_WCM1',
                'displayOption': 'modal',
                'heading': '',
                'subHeading': '',
                'paragraphs': [{
                    'contents': [
                        {
                            'hasRichContent': 'true',
                            'content': `To find physicians, medical practices, facilities, other care centers and vision care providers within the BlueCross BlueShield Federal Employee Program (FEP), please search the `,
                            'url': {
                                'displatText': 'FEP Provider Directory',
                                'address': 'https://www.fepblue.org',
                                'externalSite': 'true',
                                'style': 'link'
                            }
                        },
                        {
                            'hasRichContent': 'false',
                            'content': `.`,
                            'url': {
                                'displatText': '',
                                'address': '',
                                'style': ''
                            }
                        }
                    ]
                }]
            },
            {
                'contentId': 'mentalHealth_WCM2',
                'displayOption': 'modal',
                'heading': 'MENTAL HEALTH CAREGIVERS INFORMATION',
                'subHeading': '',
                'paragraphs': [{
                    'contents': [
                        {
                            'hasRichContent': 'false',
                            'content': `Your health plan may or may not provide coverage for mental health services. If your plan provides mental health services, check your plan's Evidence of Coverage, Certificate of Insurance or Plan Document/Employee Booklet to see which network of providers you should contact for services.`,
                            'url': {
                                'displatText': '',
                                'address': '',
                                'style': ''
                            }
                        }
                    ]
                },
                {
                    'contents': [
                        {
                            'hasRichContent': 'false',
                            'content': `If your EOC/COI states that mental health services are provided through a MHSA Participating Provider available through the Mental Health Services Administrator(MHSA) network, you can search for providers in the MHSA network.`,
                            'url': {
                                'displatText': '',
                                'address': '',
                                'style': ''
                            }
                        }
                    ]
                },
                {
                    'contents': [
                        {
                            'hasRichContent': 'false',
                            'content': `If your Employer self funds their Employee health plan, contact your HR Department to obtain a copy of the Plan Document/Employee Booklet to determine how your Mental Health benefits are administered. If the Claims Administrator is Blue Shield of California and the Plan Document/Employee Booklet states that mental health services are provided through the Claims Administrators Preferred Providers, please search the Blue Shield of California network.`,
                            'url': {
                                'displatText': '',
                                'address': '',
                                'style': ''
                            }
                        },
                        {
                            'hasRichContent': 'true',
                            'content': '',
                            'url': {
                                'displatText': 'Search Blue Shield of California/s extensive provider network.',
                                'address': '/search',
                                'externalSite': 'false',
                                'style': 'button'
                            }
                        },
                        {
                            'hasRichContent': 'true',
                            'content': '',
                            'url': {
                                'displatText': 'Search MHSA Network',
                                'address': 'https://www.magellanassist.com',
                                'externalSite': 'true',
                                'style': 'button'
                            }
                        }
                    ]
                }
                ]
            }
        ]
    };
}
