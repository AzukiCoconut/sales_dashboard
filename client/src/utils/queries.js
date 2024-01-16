import { gql } from "@apollo/client";

export const PRODUCTS_WITH_STATS = gql`
  query productsWithStats {
    productsWithStats {
      productId {
        _id
        name
        description
        price
        rating
        supply
        category
      }
      yearlySalesTotal
      yearlyTotalSoldUnits
    }
  }
`;
export const CUSTOMERS_QUERY = gql`
  query customers {
    customers {
      _id
      name
      email
      city
      country
      state
      occupation
      phoneNumber
      role
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      _id
      products {
        name
        description
        price
        supply
      }
      amount
      cost
      date
      userId
    }
  }
`;

export const GET_GEOGRAPHY = gql`
  query GetGeography {
    getGeography {
      id
      value
    }
  }
`;

export const GET_SALES = gql`
  query OverallStats {
    overallStats {
      _id
      totalCustomers
      year
      yearlySalesTotal
      yearlyTotalSoldUnits
      monthlyData {
        month
        totalSales
        totalUnits
      }
      dailyData {
        date
        totalSales
        totalUnits
      }
    }
  }
`;

export const GET_ADMINS = gql`
  query GetAdmins {
    getAdmins {
      _id
      name
      email
      city
      state
      country
      occupation
      phoneNumber
      role
    }
  }
`;

export const GET_SALES_PERFORMANCE = gql`
  query GetUserPerformance($id: ID!) {
    getUserPerformance(_id: $id) {
      user {
        _id
        name
        email
        password
        city
        state
        country
        occupation
        phoneNumber
        transactions
        role
      }
      sales {
        _id
        date
        amount
        cost
        products {
          _id
          name
        }
        userId
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      role
    }
  }
`;

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    getDashboardStats {
      totalCustomers
      yearlySalesTotal
      yearlyTotalSoldUnits
      monthlyData {
        month
        totalSales
        totalUnits
      }
      thisMonthStats {
        month
        totalSales
        totalUnits
      }
      todayStats {
        date
        totalSales
        totalUnits
      }
      transactions {
        _id
        amount
        cost
        createdAt
        date
        products {
          _id
          category
          description
          name
          price
          rating
          supply
        }
        userId
      }
    }
  }
`;
