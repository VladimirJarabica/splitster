const config = {
  tests: {
    RECORD_JACO: {
      description: "Record Jaco vs record nothing",
      usage: 100,
      defaultVariant: "NOTHING",
      variants: {
        JACO: {
          ratio: 1,
        },
        NOTHING: {
          ratio: 15,
        }
      },
    },
    CHEAPER_OPTION_CARD: {
      description: "Search with or without cheaper option card",
      defaultVariant: "WITH",
      variants: {
        WITH: {
          ratio: 1,
        },
        WITHOUT: {
          ratio: 1
        },
      }
    },
    ABANDONMENT_MODAL: {
      defaultVariant: "DISABLED",
      variants: {
        ENABLED: {
          ratio: 3,
        },
        DISABLED: {
          ratio: 13,
        },
      },
    },
    BOOKING_EARLY_WARNING: {
      defaultVariant: "WITH",
      variants: {
        WITH: {
          ratio: 1,
        },
        WITHOUT: {
          ratio: 1,
        },
      },
    },
    ONEWAY_RETURN: {
      defaultVariant: "ONEWAY",
      variants: {
        ONEWAY: {
          ratio: 1,
        },
        RETURN: {
          ratio: 0,
        },
      },
    },
    GUARANTEE: {
      defaultVariant: "IN_MODAL",
      variants: {
        IN_MODAL: {
          ratio: 1,
        },
        IN_BLANK_PAGE: {
          ratio: 1,
        },
      },
    },
    SORTING: {
      defaultVariant: "POPULARITY",
      variants: {
        POPULARITY: {
          ratio: 1,
        },
        PRICE: {
          ratio: 1,
        },
      },
    },
    PRICE_POINT_MAP: {
      description: "using pricePoints or regular old map, refresh needed. Now only used in english languages",
      user_groups: {
        check: {
          lang: ["en", "au", "ca", "ee", "hk", "in", "ie", "my", "nz", "sg", "za", "ph", "us"],
        },
      },
      defaultVariant: "DEFAULT",
      variants: {
        PRICE: {
          ratio: 1,
        },
        DEFAULT: {
          ratio: 1,
        },
      },
    },
    BAGGAGE_RECHECK: {
      defaultVariant: "ERROR",
      variants: {
        ERROR: {
          ratio: 1,
        },
        WARNING: {
          ratio: 1,
        },
      },
    },
    LOGGLY: {
      defaultVariant: "LOGGLY",
      variants: {
        LOGGLY: {
          ratio: 1,
        },
        NO_LOGGLY: {
          ratio: 1,
        },
      },
    },
    POS_ZOOZ: {
      description: "Pos on mxn currency",
      defaultVariant: "ZOOZ",
      variants: {
        POS: {
          ratio: 0,
        },
        ZOOZ: {
          ratio: 1,
        },
      },
    },
    MAP_MENU_LABELS: {
      defaultVariant: "NEXT",
      variants: {
        NEXT: {
          ratio: 1,
        },
        CHAR: {
          ratio: 1,
        },
      },
    },
  },
}

export default config